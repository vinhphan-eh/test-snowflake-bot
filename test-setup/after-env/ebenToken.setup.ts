import { useEbenTokenStore } from '../../src/common/auth/store/ebenTokenStore';

/**
 * Default: assume eBen token exist in happy case
 */
beforeEach(() => {
  useEbenTokenStore.setState({
    token: {
      accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJlYmVuZWZpdHMiLCJVc2VybmFtZSI6ImVCZW5lZml0cyIsImV4cCI6NDExNDc0MjM4OCwiaWF0IjoxNjUzMjkyNzg4fQ.dEqxbjyL5bg2kvQD31T_zvxL4iwi5g5LdACau5Wz55c',
      refreshToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJlYmVuZWZpdHMiLCJVc2VybmFtZSI6ImVCZW5lZml0cyIsImV4cCI6NDExNDc0MjM4OCwiaWF0IjoxNjUzMjkyNzg4fQ.dEqxbjyL5bg2kvQD31T_zvxL4iwi5g5LdACau5Wz55c',
    },
    tokenStatus: 'success',
  });
});
