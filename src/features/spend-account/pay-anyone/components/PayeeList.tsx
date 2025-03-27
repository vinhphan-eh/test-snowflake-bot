import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { RefreshControl, Spinner, useTheme } from '@hero-design/rn';
import { PayeeListItem } from './PayeeListItem';
import { PayeeListSectionHeader } from './PayeeListSectionHeader';
import { useDetectVisibleKeyboard } from '../../../../common/shared-hooks/useDetectVisibleKeyboard';
import type { BsbTransferPayeeAddress } from '../../../../new-graphql/generated';
import { useGetAllPayeeAddressesQuery } from '../../../../new-graphql/generated';

interface PayeeListProps {
  searchQuery?: string;
}

type PayeesList = BsbTransferPayeeAddress[];
type PayeeFlatListItem = BsbTransferPayeeAddress | { letter: string };
type PayeeListGroupedResult = {
  [key: string]: PayeesList;
};

const groupPayeesList = (payeesList: PayeesList): PayeeListGroupedResult => {
  const groupedPayees = payeesList
    .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName))
    .reduce((result: PayeeListGroupedResult, payee: BsbTransferPayeeAddress) => {
      const newResult = { ...result };
      const letter = payee.friendlyName.charAt(0).toUpperCase();

      if (letter) {
        if (result[letter]) {
          newResult[letter].push(payee);
        } else {
          newResult[letter] = [payee];
        }
      }

      return newResult;
    }, {});

  return groupedPayees;
};

const flattenPayeesList = (
  payeesList: PayeeListGroupedResult,
  searchQuery = ''
): {
  data: PayeeFlatListItem[];
  headerIndices: number[];
} => {
  let data = [] as PayeeFlatListItem[];
  const headerIndices = [] as number[];

  Object.keys(payeesList).forEach(letter => {
    const includedPayess = searchQuery
      ? payeesList[letter].filter(payee => payee.friendlyName.toLowerCase().includes(searchQuery.toLowerCase()))
      : payeesList[letter];

    if (includedPayess.length) {
      headerIndices.push(data.length);
      data = [...data, { letter }, ...includedPayess];
    }
  });

  return {
    data,
    headerIndices,
  };
};

const PayeeList = ({ searchQuery }: PayeeListProps) => {
  const { space } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [groupedFullPayeeList, setGroupedPayeeList] = useState<PayeeListGroupedResult>({});
  const [flattenResult, setFlattenResult] = useState<{
    data: PayeeFlatListItem[];
    headerIndices: number[];
  }>({
    data: [],
    headerIndices: [],
  });
  const payeeListScrollViewRef = useRef<ScrollView>(null);
  const isKeyboardVisible = useDetectVisibleKeyboard();

  const { isLoading, refetch } = useGetAllPayeeAddressesQuery(undefined, {
    onSuccess: data => {
      const payeesList = (data?.me?.wallet?.payeeAddresses ?? []).filter(Boolean) as PayeesList;
      setGroupedPayeeList(groupPayeesList(payeesList));
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch().finally(() => setRefreshing(false));
  };

  useEffect(() => {
    setFlattenResult(flattenPayeesList(groupedFullPayeeList, searchQuery));
    // To get rid of the padding in case of search results updated
    payeeListScrollViewRef?.current?.scrollTo({ animated: false, y: 0 });
  }, [searchQuery, groupedFullPayeeList]);

  if (isLoading) {
    return <Spinner accessibilityLabel="spinner" style={{ marginTop: space.xxsmall }} size="small" />;
  }

  return (
    <ScrollView
      style={{
        paddingHorizontal: 0,
        marginHorizontal: 0,
      }}
      ref={payeeListScrollViewRef}
      testID="payee-list"
      stickyHeaderIndices={flattenResult.headerIndices}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: isKeyboardVisible ? 0 : space['5xlarge'] * 2 + space.medium,
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {flattenResult.data.map((item: PayeeFlatListItem) => {
        // Letter header element
        if (Object.keys(item).includes('letter')) {
          const { letter } = item as { letter: string };
          return <PayeeListSectionHeader key={`payee-section-header-${letter}`} letter={letter} />;
        }

        // Payee address detail element
        const payeeDetails = item as BsbTransferPayeeAddress;
        return (
          <PayeeListItem
            key={`payee-${payeeDetails.bsb}-${payeeDetails.accountNumber}`}
            payee={payeeDetails}
            searchQuery={searchQuery}
          />
        );
      })}
    </ScrollView>
  );
};

export { PayeeList };
