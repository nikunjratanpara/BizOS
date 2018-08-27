import React from 'react';
import {Observable} from 'rxjs';
interface IFormDataComboProps {
    searchService:ISearchService,
    codeCol: string;
    discriptionCol: string;
    onSelect: ({value:string}) => void;
    formatter: (item:any) => string;
    controlPosition: {
        offsetLeft: number;
        offsetTop:number;
        offsetHeight:number;
        clientWidth:number;
    }
}
export interface ISearchService {
    search(term:string) : Observable<any>;
}
export class FormDataCombo extends React.Component {
    constructor(public props:IFormDataComboProps) {
        super(props)
    }
    render() {
        let parentDivStyle = {
            position: 'absolute' as 'absolute',
            top: this.props.controlPosition.offsetTop + this.props.controlPosition.offsetHeight + 'px',
            left: this.props.controlPosition.offsetLeft + 'px',
            clientWidth: this.props.controlPosition.clientWidth+ 'px',
            'z-index': 100,
        };
        
        
        return (
            <div className="tt-menu" style={parentDivStyle}>
                <div className="tt-dataset tt-dataset-states">
                    <div className="tt-suggestion tt-selectable">
                        <strong className="tt-highlight">Vi</strong>rginia
                    </div>
                    <div className="tt-suggestion tt-selectable">           
                        West<strong className="tt-highlight">Vi</strong>rginia
                    </div>
                </div>
            </div>
        );
    }
}