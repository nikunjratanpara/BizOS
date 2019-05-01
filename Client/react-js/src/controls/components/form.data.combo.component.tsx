import * as React from 'react';
import { ComboDisplayStyle, TypeaheadOptions } from '../models';
import BaseControl from './base.control.component';
import { IBaseControlProps } from "./IBaseControlProps";
import { IBaseControlState } from './IBaseControlState';
import SearchBox from './typeahead/searchbox.component';


export default BaseControl(class FormDataCombo extends React.Component<IBaseControlProps, IBaseControlState> {
    constructor(props: IBaseControlProps) {
        super(props);
        this.OnSelect = this.OnSelect.bind(this)
    }
    public OnSelect(item: any) {
        return item;
    }
    public render() {
        const typeaheadOptions: TypeaheadOptions = this.props.typeaheadOptions || { catId: '', displayStyle: ComboDisplayStyle.codeDesciption };
        return (<SearchBox
            catalogName={typeaheadOptions.catId}
            codeCol='code'
            discriptionCol='description'
            name={this.props.name}
            type={this.props.type}
            value={this.props.value}
            onSelect={this.OnSelect}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onClick={this.props.onClick}
            onDoubleClick={this.props.onDoubleClick}
            onFocus={this.props.onFocus}
            onInput={this.props.onInput}
            onKeyDown={this.props.onKeyDown}
            onKeyPress={this.props.onKeyPress}
            onKeyUp={this.props.onKeyUp}
            onMouseDown={this.props.onMouseDown}
            onMouseMove={this.props.onMouseMove}
            onMouseOut={this.props.onMouseOut}
            onMouseOver={this.props.onMouseOver}
            onMouseUp={this.props.onMouseUp}
            onWheel={this.props.onWheel}
            {...this.props}
        />
        )
    }
});