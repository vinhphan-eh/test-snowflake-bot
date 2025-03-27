export const unblockOrgs = async () => {
  await fetch(process.env.E2E_HEROPAY_SERVICE_REST_API_URL + '/e2e/unblock_all', {
    method: 'POST'
  });
};
