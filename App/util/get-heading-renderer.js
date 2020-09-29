/* eslint-disable react/prop-types */
import React from "react";

const flatten = (text, child) => {
    return typeof child === 'string'
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text)
};

export const getHeadingRenderer = (props) => {
    const children = React.Children.toArray(props.children)
    const text = children.reduce(flatten, '')
    const slug = text.toLowerCase().replace(/\W/g, '-')

    return React.createElement('h' + props.level, {id: slug}, props.children)
};
