import { connect } from 'react-redux';
import { Action } from 'redux';
import { MenuComponent } from 'src/components/menu/menu.component';

import { IMenuConfig, loadMenu } from './menu.action';

const mapStateToPropParams = (state: { menuConfig: IMenuConfig }) => ({ menuConfig: state.menuConfig });
const mapDispatchToProps = (dispatch: (action: Action) => void) => {
    return {
        loadMenu: (configName: string) => {
            dispatch(loadMenu(configName))
        }
    }
}
export default connect(mapStateToPropParams, mapDispatchToProps)(MenuComponent);