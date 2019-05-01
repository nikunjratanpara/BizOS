import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import { Subject, Subscription } from 'rxjs';
import { Option } from 'src/controls/models';
import { isObject } from 'util';
import { Key } from '../../models/enums';
import BaseControl from '../base.control.component';
import { IBaseControlProps } from "../IBaseControlProps";
import { IBaseControlState } from '../IBaseControlState';
import { catalogSearch } from './actions/catalog.services';
import { IObservableSearchService, ISearchOptions, ISearchService } from './actions/models/search.service.model';
import { searchService } from './actions/search.service';
import { SearchSuggestions } from './search.suggestions.component';



interface IFormDataComboProps extends IBaseControlProps {
    catalogName?: string;
    codeCol: string;
    discriptionCol: string;
    formatter?: (item: any, codeCol: string, discriptionCol: string) => string;
    searchService?: ISearchService,
    selectOptions: Option[];
}

// SerchService will be provided by consumer
// code and discription property must be set according to rendering needed
// formatter can be provided , incase of formatter no need of desciption propery to be defined.
// code propery will be used for control value assignment, so code propery is must.
// initial value must be object and not string
// onSelect, onBlur, onFocus will be supported initially
export default BaseControl(class SearchBox extends React.Component<IFormDataComboProps, IBaseControlState> {
    public search$: Subject<ISearchOptions>;
    public subscription: Subscription;
    public searchService: IObservableSearchService;
    public control: HTMLInputElement;
    public clientStyle = {};
    private formatter: (item: any) => string;

    constructor(public props: IFormDataComboProps) {
        super(props);
        this.search$ = new Subject();
        this.onChange = this.onChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.fetchAllOptions = this.fetchAllOptions.bind(this);
        this.searchService = searchService(this.props.searchService || catalogSearch(this.props.catalogName || ''));
        this.formatter = this.props.formatter || ((item: any): string => {
            if (item && isObject(item)) {
                if (item[this.props.codeCol] && item[this.props.discriptionCol]) {
                    return item[this.props.codeCol] + ' - ' + item[this.props.discriptionCol];
                } else {
                    return item[this.props.codeCol] || item[this.props.discriptionCol] || '';
                }
            }
            return item || '';
        }).bind(this);

        this.state = {
            displayValue: this.formatter(this.props.value),
            selectOptions: [],
            selectedIndex: 0,
            value: this.props.value || ''
        };
    }

    public componentDidMount() {
        this.subscription = this.searchService(this.search$.asObservable())
            .subscribe(response => { this.setState({ selectOptions: response }); });
    }

    public componentWillUnmount() {
        this.setState({ displayValue: this.formatter(this.state.value) });
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    public handleKeyDown(event: any) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
        if (this.isOpen() && Key[event.which.toString()]) {
            switch (event.which) {
                case Key.ArrowDown:
                    this.setState({ selectedIndex: this.state.selectedIndex + (this.state.selectedIndex < this.state.selectOptions.length - 1 ? 1 : 0) });
                    event.preventDefault();
                    break;
                case Key.ArrowUp:
                    this.setState({ selectedIndex: this.state.selectedIndex - (this.state.selectedIndex > 0 ? 1 : 0) });
                    event.preventDefault();
                    break;
                case Key.Escape:
                    event.value = null;
                    this.onSelect(event);
                    event.preventDefault();
                    break;
                case Key.Tab:
                case Key.Enter:
                    this.onSelect({ value: this.state.selectOptions[this.state.selectedIndex] });
                    if (Key.Enter === event.which) {
                        event.preventDefault();
                    }
                    break;
            }
        }
    }
    public onChange(event: any) {
        this.setState({ displayValue: event.target.value, value: '' });
        if (event.target.value) {
            this.search$.next({ searchTerm: event.target.value as string, showAllOptions: false });
        } else {
            this.search$.next(undefined);
            event.value = null;
            this.onSelect(event);
        }
    }
    public onSelect(event: any) {
        if (event) {
            event.target = event.target || {};
            event.target.name = this.props.name;
            this.setState({
                displayValue: this.formatter(event.value),
                selectOptions: [],
                value: event.value
            });

            if (this.props.onSelect) {
                this.props.onSelect(event);
            }
        }
    }

    public render() {
        if (this.control) {
            this.clientStyle = {
                clientWidth: this.control.clientWidth,
                offsetHeight: this.control.offsetHeight,
                offsetLeft: this.control.offsetLeft,
                offsetTop: this.control.offsetTop
            };
        }
        return (
            <Col md={this.props.width || 12}>
                <FormGroup>
                    <Label for={this.props.name}> {this.props.label} </Label>
                    <input type={this.props.type}
                        className="form-control"
                        ref={(control: HTMLInputElement) => this.control = control}
                        placeholder={this.props.placeholder}
                        value={this.state.displayValue}
                        name={this.props.name}
                        id={this.props.name}
                        onChange={this.onChange}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.props.onBlur}
                        onClick={this.props.onClick}
                        onDoubleClick={this.props.onDoubleClick}
                        onFocus={this.props.onFocus}
                        onInput={this.props.onInput}
                        onKeyPress={this.props.onKeyPress}
                        onKeyUp={this.props.onKeyUp}
                        onMouseDown={this.props.onMouseDown}
                        onMouseMove={this.props.onMouseMove}
                        onMouseOut={this.props.onMouseOut}
                        onMouseOver={this.props.onMouseOver}
                        onMouseUp={this.props.onMouseUp}
                        onWheel={this.props.onWheel}
                        disabled={this.props.disabled}
                        autoComplete="nope"
                    />
                    <span className="icon" onClick={this.fetchAllOptions}>
                        <FontAwesomeIcon icon={['fas', 'chevron-down']} />
                    </span>
                    <SearchSuggestions
                        formatter={this.formatter}
                        searchTerm={this.state.displayValue}
                        selectedIndex={this.state.selectedIndex}
                        onSelect={this.onSelect}
                        offsetLeft={(this.control || { offsetLeft: 0 }).offsetLeft as number}
                        offsetHeight={(this.control || { offsetHeight: 0 }).offsetHeight as number}
                        offsetTop={(this.control || { offsetTop: 0 }).offsetTop as number}
                        clientWidth={(this.control || { clientWidth: 0 }).clientWidth as number}
                        results={this.state.selectOptions}
                    />
                </FormGroup>
            </Col>
        );
    }

    private isOpen(): boolean {
        return this.state.selectOptions.length > 0;
    }
    private fetchAllOptions() {
        this.search$.next({ searchTerm: '', showAllOptions: true });
        this.control.focus();
    }
});