/* eslint-disable react/prop-types */
import React from "react";
import { Adsense } from "@ctrl/react-adsense";

const flatten = (text, child) => {
    return typeof child === 'string'
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text)
};

export const getHeadingRenderer = (props) => {
    const children = React.Children.toArray(props.children)
    const text = children.reduce(flatten, '')
    const slug = text.toLowerCase().replace(/\W/g, '-')
    const adData = props.adData

    const Element = 'h' + props.level

    return (
       <>
           {/*{!!adData && (
             <div style={{ width: '100%', marginBottom: '8px' }}>
                 <Adsense
                   client={adData.client}
                   slot={adData.slot}
                   format="fluid"
                   layout="in-article"
                 />
             </div>
           )}*/}

          <Element id={slug}>
              {props.children}
          </Element>
       </>
    );
};
