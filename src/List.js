import React, { Component } from "react";
import lodash from 'lodash';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export class List extends Component {

    render() {

        // console.log("Props", this.props.list);
        const cardList = this.props && this.props.list && this.props.list.length ? this.props.list : [];
        return (
            <div>
                {cardList && cardList.length ?
                    <Accordion allowZeroExpanded style={{ border: "0.1em solid #ffffff" }}>
                        {cardList.sort().map((item, index) => (
                            <AccordionItem key={index}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        {item.location}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <div className="container" style={{ border: "0.1em solid #333333", borderBottom: "none" }}>
                                        {Object.keys(item).map((eachValue, eachIndex) => {
                                            return eachValue !== "location" ?
                                                <div className="row" style={{ borderBottom: "0.1em solid black" }} key={eachIndex}>
                                                    <span className="col-md-6"
                                                        style={{
                                                            textAlign: "left", padding: "0.1em 0.1em 0.1em 1em",
                                                            borderRight: "0.1em solid black", fontWeight: "bolder"
                                                        }}>
                                                        {lodash.capitalize(lodash.replace(eachValue, "_", " "))}
                                                    </span>
                                                    <span className="col-md-6"
                                                        style={{
                                                            textAlign: "left", padding: "0.1em 0.1em 0.1em 1em",
                                                            fontWeight: "normal"
                                                        }}>
                                                        {!lodash.isEmpty(item[eachValue]) && !lodash.isNil(item[eachValue]) ? item[eachValue] : "-"}
                                                    </span>
                                                </div> : <div></div>

                                        })}

                                    </div>

                                </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    :
                    <div className="text-center">
                        <h1>Can't find that Battle Location ...</h1>
                    </div>
                }
            </div>

        );
    }
};

export default List;