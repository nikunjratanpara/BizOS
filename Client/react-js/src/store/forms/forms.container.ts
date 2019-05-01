import { connect } from 'react-redux';
import { Action } from 'redux';

import { FormComponent } from '../../controls/components/form.component/form.component';
import { IFormConfig, loadFormConfig } from './forms.action';

const mapStateToPropParams = (state: { formConfig: IFormConfig }) => ({ formConfig: state.formConfig });
const mapDispatchToProps = (dispatch: (action: Action) => void) => {
    return {
        loadFormConfig: (configName: string) => {
            dispatch(loadFormConfig(configName))
        }
    }
}
export default connect(mapStateToPropParams, mapDispatchToProps)(FormComponent);