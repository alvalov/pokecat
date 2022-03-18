import React from "react";
import {shallow} from "enzyme";
import jestRenderer from "react-test-renderer";
import {Dummy} from "../features/dummy/Dummy"; 

test("Component should render text if prop is true", ()=> {
    const component = jestRenderer.create(
        <Dummy shouldRenderText={true} text="Hello World!"/>
    );
    const tree=component.toJSON();
    expect(tree).toMatchSnapshot();
})

test("Shallow render works", ()=>{
    const component = shallow(
        <Dummy shouldRenderText={true} text="Hello World!"/>
    );
    expect(component.text()).toEqual("Hello World!");
})