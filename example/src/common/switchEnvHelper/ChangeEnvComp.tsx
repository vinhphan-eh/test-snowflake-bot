import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@hero-design/rn';
import { TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
// auto-generated json file at postinstall or run yarn load-env
import EnvStag from './env-staging.json';
import EnvProd from './env-prod.json';
import { useMimicEnvStore } from './useMimicEnvStore';
import { CustomBottomSheetView } from '../../../../src/common/components/bottom-sheet/CustomBottomSheetView';
import type { BottomSheetRef } from '../../../../src/common/components/bottom-sheet/BottomSheet';
import RadioButton from '../component/RadioButton';

const STAG_KEY = 'stag';
const PROD_KEY = 'prod';

export const ChangeEnvComp = () => {
  const [env, setEnv] = useState(STAG_KEY);
  const bsRef = useRef<BottomSheetRef>(null);

  useEffect(() => {
    const source = env === STAG_KEY ? EnvStag : EnvProd;
    if (Array.isArray(source) && source.length > 0) {
      const result = source.reduce((acc, item) => {
        //@ts-ignore
        acc[item.key] = item.value;
        //@ts-ignore
        Config[item.key] = item.value;
        return acc;
      }, {});

      useMimicEnvStore.setState({ config: result as typeof Config });
    }
  }, [env]);
  return (
    <Box
      style={{
        position: 'absolute',
        top: 60,
        right: 16,
        alignItems: 'flex-end',
      }}>
      <TouchableOpacity
        onPress={() => {
          bsRef.current?.open();
        }}>
        <Typography.Caption
          style={{
            textAlign: 'right',
            textDecorationLine: 'underline',
            textDecorationColor: 'blue',
            color: 'blue',
          }}>
          How to use ?
        </Typography.Caption>
      </TouchableOpacity>

      <Box marginTop="small" flexDirection="row">
        <RadioButton
          style={{ marginRight: 8 }}
          onPress={setEnv}
          value={STAG_KEY}
          title="Stag"
          selected={env === STAG_KEY}
        />
        <RadioButton
          onPress={setEnv}
          value={PROD_KEY}
          title="Prod"
          selected={env === PROD_KEY}
        />
      </Box>
      <CustomBottomSheetView
        bsRef={bsRef}
        content={() => (
          <Box paddingHorizontal="medium" paddingBottom="medium">
            <Typography.Body>
              1/ Prepare .env and .env.prod at example
            </Typography.Body>
            <Typography.Body>
              2/ Sample json data env-staging.json and env-prod.json are
              automatically generated after `yarn install`
            </Typography.Body>
            <Typography.Body>
              2/ If you change any env value and need to re-sync, run `yarn
              load-env`
            </Typography.Body>
          </Box>
        )}
        title="How to use"
      />
    </Box>
  );
};
