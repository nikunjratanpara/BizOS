import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardDeck from 'reactstrap/lib/CardDeck';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { CompanyInfo } from './CompanyInfo';
import { EducationInfo } from './EducationInfo';
import { ProjectInfo } from './ProjectInfo';



export interface ICompany {
    companyName: string;
    duration: {
        from: string;
        to: string;
    };
    role: string;
}
export interface IEducation {
    collageName: string;
    course: string;
    duration: {
        from: string;
        to: string;
    };
    result: string;
}

export interface IProjectDetails {
    details: string[];
    name: string;
    role: string;
    technologies: string;
}

export class Resume extends React.Component {
    private companyInfo: ICompany[] = [
        {
            companyName: 'Deutsche Telekom Clinical Solutions India Pvt Ltd CMMI-5',
            duration: { from: 'SEPTEMBER 2016', to: 'PRESENT' },
            role: 'Senior Software Developer'
        },
        {
            companyName: 'Winsoft Technologies Pvt. Ltd.',
            duration: { from: 'FEBRUARY 2014', to: 'AUGUST 2016' },
            role: 'Senior Software Developer/ Module Lead '
        },
        {
            companyName: 'T​​ime Legend Travels and Tours Pvt. Ltd.',
            duration: { from: 'NOVEMBER 2011', to: 'AUGUST 2013' },
            role: 'Software Developer'
        }
    ];
    private educationInfo: IEducation[] = [
        {
            collageName: 'Gujarat University, Ahmedabad',
            course: 'Master Of Computer Application',
            duration: { from: 'MAY 2008', to: 'JULY 2011' },
            result: 'First Class 61%'
        },
        {
            collageName: 'Christ College, Rajkot',
            course: 'Bachelor of Business Administration​​',
            duration: { from: 'MAY 2005', to: 'APRIL 2008' },
            result: 'Second Class 58%'
        }
    ];
    private projectDetails: IProjectDetails[] = [
        {
            details: [
                `IMedOne is Hospital Management System which is used in large hospital to small clinic. 
                 Management System (PMS) is one module of iMedOne from which user can admit patient, register movement, discharge patient, alarm information, insurance details etc.
                `
            ],
            name: 'IMedOne PMS ',
            role: 'Senior Software Developer',
            technologies: 'AngularJS, Bootstrap, .Net Framework 4.6, C#, ASP.NET, Oracle.'
        },
        {
            details: [
                `MFSS is back office system for MF Distributors to perform various type of transactions like Purchase, Redeem, Switch, SIP, STP ,SWP, Brokerage Reconciliation, Order Reconciliation, folio remapping, folio update, scheme update etc Reports verification such as Ledger report, MF Holding Report, MIS. Generate Triggers for mail and SMS communications based on alert configuration made by User for client category and Client Segment.
                 It also include module for Customer Risk Profile.
                `
            ],
            name: 'MFSS (Mutual Fund Support System)',
            role: 'Module Lead',
            technologies: '.Net Framework 3.5, C#, ASP.NET, SQL Server – 2008, Jquery , KnockoutJS , Bootstrap.'
        }
    ];
    public render() {
        const companies = this.companyInfo.map((company, index) => <CompanyInfo key={index} item={company} />)
        const education = this.educationInfo.map((educationDetail, index) => <EducationInfo key={index} item={educationDetail} />)
        const projects = this.projectDetails.map((project, index) => <ProjectInfo key={index} item={project} />);
        return <article className="resume">
            <header>
                <Row>
                    <Col md={6} sm={12}>
                        <h4>Nikunj​ ​Ratanpara</h4>
                        <h6>Senior Software Developer</h6>
                    </Col>
                    <Col className="text-right">
                        <address>
                            GB-203, Shravandhara society<br />
                            Behind D-mart, Sasane Nagar<br />
                            Hadapsar, Pune-411028<br />
                            9033711226 / 8408005243
                        </address>
                        <a href="mailto:nikunjratanpara@gmail.com">
                            <FontAwesomeIcon icon={['fas', 'envelope']} />
                            <span className="print">nikunjratanpara@gmail.com</span>
                        </a>
                        &nbsp;&nbsp;
                        <br className="print" />
                        <a href="https://github.com/nikunjratanpara/">
                            <FontAwesomeIcon icon={['fab', 'github']} />
                            <span className="print">https://github.com/nikunjratanpara/</span>
                        </a>
                        &nbsp;&nbsp;
                        <br className="print" />
                        <a href="https://www.linkedin.com/in/nikunj-ratanpara-53982218/">
                            <FontAwesomeIcon icon={['fab', 'linkedin']} />
                            <span className="print">https://www.linkedin.com/in/nikunj-ratanpara-53982218/</span>
                        </a>
                    </Col>
                </Row>
            </header>
            <div>
                <CardBody className="p-0 text-justify">
                    <CardTitle>SUMMARY</CardTitle>
                    <CardText>
                        6.5 Years of experience in Analysis, Design, and Development of Software Applications - all stages of Software Development life cycle (SDLC).
                    </CardText>
                    <CardText>
                        Extensively worked on .NET Framework 3.5/4.6 .Net Core with ASP.NET, ADO.Net,web API, Angular, Typescript, JavaScript, JQuery, MS-SQL Server 2008, Oracle.
                    </CardText>
                    <CardText>
                        Having good Knowledge of ReactJS and Redux.
                    </CardText>
                </CardBody>

                <Card className="p-0 text-justify">
                    <CardTitle>EDUCATION </CardTitle>
                    <CardBody>
                        {education}
                    </CardBody>
                </Card>
                <CardBody className="p-0 text-justify">
                    <CardTitle>ACHIEVEMENTS</CardTitle>
                    <CardDeck>
                        <p> Secured ​<strong>Microsoft Certified Professional(MCP)</strong> for <strong>“​Programming in HTML5 with JavaScript and CSS3​​”</strong>
                            <br /> JUNE-2014 </p>
                    </CardDeck>
                </CardBody>
                <CardBody className="p-0 text-justify">
                    <CardTitle>EXPERIENCE</CardTitle>
                    <CardDeck>
                        {companies}
                    </CardDeck>
                </CardBody>
                <CardBody className="p-0 text-justify">
                    <CardTitle>TECHNICAL​ ​​SKILLS</CardTitle>
                    <CardDeck>
                        <p>.​Net Framework 3.5, 4.0, 4.6 / .Net Core 2.x ASP.NET, ADO.NET, web API, ,Windows Application</p>
                        <p>AngularJS, Typescript , Angular 2.0+, ReactJS, Redux, JavaScript, CSS3</p>
                        <p>MS SQL Server 2008, 2005, Oracle</p>
                        <p>Docker, Kubernetes</p>
                        <p>Crystal Reports</p>
                        <p>Team Foundation Server, SVN, Visual Source Safe</p>
                        <p>IIS 6/7.0/8, Click once Deployment</p>
                    </CardDeck>
                </CardBody>
                <CardBody className="p-0 text-justify">
                    <CardTitle>PERSONAL DETAILS</CardTitle>
                    <CardDeck>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ width: "150px" }}>
                                        <strong>Date of Birth</strong>
                                    </td>
                                    <td>
                                        12/02/1988
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Marital Status</strong>
                                    </td>
                                    <td>
                                        Married
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Gender</strong>
                                    </td>
                                    <td>
                                        Male
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardDeck>
                </CardBody>
                <CardBody className="p-0 text-justify">
                    <CardTitle>LANGUAGES</CardTitle>
                    <CardBody>
                        <div>English, Hindi and Gujarati.</div>
                    </CardBody>
                </CardBody>
            </div>
            <br className="print" />
            <br className="print" />
            <br className="print" />
            <br className="print" />
            <br className="print" />
            <br className="print" />
            <br className="print" />
            <br className="print" />
            <div>
                <CardBody className="p-0 text-justify">
                    <CardTitle>PROJECTS</CardTitle>
                    {projects}
                </CardBody>
            </div>
        </article>
    }
}

