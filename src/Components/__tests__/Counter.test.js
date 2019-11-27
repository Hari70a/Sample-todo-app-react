import React from "react";
import renderer from "react-test-renderer";
import { shallow, render, mount } from "enzyme";

import Counter from "../Counter";

test("Counter with name props", () => {
  // const ConditionalComponent = () => <Counter></Counter>;
  // const children = () => (
  //   <div>
  //     <div>
  //       <p>Hello Jai sree Ram</p>
  //       <button>Click</button>
  //     </div>
  //   </div>
  // );
  const name = "Sri ram";
  const component = shallow(<Counter name={name} />);
  //   let tree = component.toJSON();
  //   console.log(component, "component");
  //expect(tree).toMatchSnapshot();
  // expect(component.html()).not.toBe(null);
  expect(component.find("p").text()).toBe(`Hello ${name}`);
  //   expect(component.find("button").text()).toEqual(`Click`);
});
