import * as React from 'react';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';

interface IProp {
    offsetLeft: number;
    offsetTop: number;
    offsetHeight: number;
    clientWidth: number;
    results: any[];
    searchTerm: string;
    selectedIndex: number;
    onSelect?: (item: any) => void;
    formatter: (item: any) => string;
}

export class SearchSuggestions extends React.Component<IProp> {

    constructor(public props: IProp) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }
    public onSelect(item: any) {
        if (this.props.onSelect && typeof this.props.onSelect === 'function') {
            this.props.onSelect(item);
        }
    }
    public render() {
        const parentDivStyle = {
            display: this.props.results.length > 0 ? '' : 'none',
            left: this.props.offsetLeft + 'px',
            minWidth: this.props.clientWidth + 'px',
            position: 'absolute' as 'absolute',
            top: this.props.offsetTop + this.props.offsetHeight + 'px',
            zIndex: 100
        };
        const suggestions = this.props.results.map((item, index) => {
            return <ListItem key={index} item={item} index={index} selectedIndex={this.props.selectedIndex} onSelect={this.onSelect} formatter={this.props.formatter} />
        })
        return (
            <ListGroup style={parentDivStyle}>
                {suggestions}
            </ListGroup>
        );
    }
}

function ListItem(props: any) {
    function onSelect(event: any) {
        event.value = props.item;
        props.onSelect(event);
    }
    return (<ListGroupItem className="pt-1 pb-1" onClick={onSelect} active={props.selectedIndex === props.index} > {props.formatter(props.item)} </ListGroupItem>);
}