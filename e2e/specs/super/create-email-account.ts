import imaps from 'imap-simple';
import Config from 'react-native-config';

export type EtherealEmailAccount = {
  email: string;
  getEmails: (searchCriteria: unknown[]) => Promise<imaps.Message[]>;
  closeConnection: () => void;
};

export const createEmailAccount = async (): Promise<EtherealEmailAccount> => {
  const testAccount = {
    user: Config.E2E_ETHEREAL_EMAIL_USER,
    pass: Config.E2E_ETHEREAL_EMAIL_PASS,
  };

  const config = {
    imap: {
      user: testAccount.user,
      password: testAccount.pass,
      host: 'imap.ethereal.email',
      port: 993,
      tls: true,
      authTimeout: 10000,
    },
  };

  const connection = await imaps.connect(config);
  await connection.openBox('INBOX');

  return {
    email: testAccount.user,

    async getEmails(searchCriteria: unknown[]) {
      try {
        const fetchOptions = {
          bodies: ['HEADER', 'TEXT'],
          markSeen: false,
          struct: true,
        };

        const messages = await connection.search(searchCriteria, fetchOptions);
        return messages;
      } catch (error) {
        console.error('Failed to retrieve emails:', error);
        throw error;
      }
    },

    closeConnection() {
      connection.end();
    },
  };
};
