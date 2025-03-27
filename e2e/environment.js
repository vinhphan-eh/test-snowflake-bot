// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DetoxCircusEnvironment } = require('detox/runners/jest');
const { unblockOrgs } = require("./utils/herocli/execution");

class CustomDetoxEnvironment extends DetoxCircusEnvironment {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config, context) {
    super(config, context);

    // Can be safely removed, if you are content with the default value (=300000ms)
    // this.initTimeout = 300000;
    //
    // // This takes care of generating status logs on a per-spec basis. By default, Jest only reports at file-level.
    // // This is strictly optional.
    // this.registerListeners({
    //   SpecReporter,
    //   WorkerAssignReporter,
    // });
  }
}

module.exports = CustomDetoxEnvironment;

// This is a workaround to unblock the orgs only once time
if (process.env.IS_E2E === 'true') {
  unblockOrgs();
}
