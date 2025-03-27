import type { ChildProcess } from 'child_process';
import { spawn, execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import uuid from 'react-native-uuid';

/**
 * An utility class that controls an [expect](https://linux.die.net/man/1/expect) script
 * which in turn automates a herocli session.
 *
 * Use by inheriting this class, initialize with a service name, and call cmd().
 */
export class Service {
  private serviceName: string;

  private inpFilePath: string;

  private outFilePath: string;

  private pid: string;

  constructor(serviceName: string) {
    if (!serviceName) {
      throw new Error('serviceName is required');
    }

    this.serviceName = serviceName;

    fs.mkdirSync('.herocli', { recursive: true });
    this.cleanup();

    this.inpFilePath = path.join(this.createTmpDir(), `inp_${this.generateHex()}`);
    this.outFilePath = path.join(this.createTmpDir(), `out_${this.generateHex()}`);
    fs.writeFileSync(`.herocli/.herocli_${this.serviceName}_inp`, this.inpFilePath);
    fs.writeFileSync(`.herocli/.herocli_${this.serviceName}_out`, this.outFilePath);
    execSync(`mkfifo ${this.inpFilePath}`);
    execSync(`mkfifo ${this.outFilePath}`);

    const child: ChildProcess = spawn(
      `${__dirname}/service.expect`,
      [this.serviceName, this.inpFilePath, this.outFilePath],
      {
        serialization: 'advanced',
        detached: true,
        // shell: true,
        stdio: 'inherit',
      }
    );
    this.pid = String(child.pid || '');
    fs.writeFileSync(`.herocli/.herocli_${this.serviceName}_pid`, this.pid);
  }

  cmd(lines: string) {
    const cmdId = uuid.v4() as string;

    if (lines.indexOf('"') >= 0) {
      console.warn('Your string contains double quotes, be careful escaping it before feeding into expect.');
      console.warn('Your string is: ', lines);
    }

    lines.split('\n').forEach(line => this.s(line));
    this.s(`puts 'HEROCLIFINISHED ' + '${cmdId}'`);
    this.e(`HEROCLIFINISHED ${cmdId}`);
  }

  async getAsJSON<T>(expression: string, timeout?: number): Promise<T> {
    const cmdId = uuid.v4() as string;

    const lines = expression.split(/\r?\n/);
    if (lines.length > 1) {
      throw new Error('Multiple line expression is currently not supported.');
    }

    this.s(`puts 'HEROCLIRESULT ' + '${cmdId} ' + (${expression}).to_json`);
    this.c(`HEROCLIRESULT ${cmdId}`);

    const controller = new AbortController();
    const signal = controller.signal;
    if (timeout !== undefined) {
      setTimeout(() => {
        controller.abort();
      }, timeout);
    }
    return new Promise((resolve, reject) => {
      fs.readFile(this.outFilePath, { encoding: 'utf8', signal }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(data));
      });
    });
  }

  protected s(line: string): void {
    fs.writeFileSync(this.inpFilePath, `s ${line}\n`);
  }

  protected e(value: string): void {
    fs.writeFileSync(this.inpFilePath, `e ${value}\n`);
  }

  protected c(prefix: string): void {
    fs.writeFileSync(this.inpFilePath, `c ${prefix}\n`);
  }

  cleanup(): void {
    this.cleanUpOldInpFile();
    this.cleanUpOldOutFile();
    this.cleanUpOldProcess();
  }

  private cleanUpOldInpFile(): void {
    try {
      const oldInpFilePath = fs.readFileSync(`.herocli/.herocli_${this.serviceName}_inp`, 'utf8');
      if (oldInpFilePath) {
        fs.unlinkSync(oldInpFilePath);
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  }

  private cleanUpOldOutFile(): void {
    try {
      const oldOutFilePath = fs.readFileSync(`.herocli/.herocli_${this.serviceName}_out`, 'utf8');
      if (oldOutFilePath) {
        fs.unlinkSync(oldOutFilePath);
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  }

  private cleanUpOldProcess(): void {
    try {
      const pid = fs.readFileSync(`.herocli/.herocli_${this.serviceName}_pid`, 'utf8');
      if (pid) {
        process.kill(parseInt(pid, 10), 'SIGKILL');
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  }

  private createTmpDir(): string {
    const tmpDir = path.join('/tmp', `herocli_${this.generateHex()}`);
    fs.mkdirSync(tmpDir);
    return tmpDir;
  }

  private generateHex(): string {
    return Math.random().toString(16).slice(2);
  }
}
