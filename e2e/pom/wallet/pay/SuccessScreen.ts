import { tapByText } from '../../../utils/common-actions';
import { BaseScreen } from '../../BaseScreen';

export class SuccessScreen extends BaseScreen {
  async pressDoneButton() {
    await tapByText('Done');
  }
}
