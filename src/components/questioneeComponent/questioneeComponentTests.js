'use strict';

import assert from 'assert';
import React from 'react/addons';
import QuestioneeComponent from '../questioneeComponent/questioneeComponent';

const TestUtils = React.addons.TestUtils;

describe('the questioneeComponent should', () => {
  it('return the questionee prop as its text', () => {
    const shallowRenderer = TestUtils.createRenderer();
    const testQuestionee = 'Test questionee';
    shallowRenderer.render(React.createElement(QuestioneeComponent, {
      questionee: testQuestionee
    }));

    const component = shallowRenderer.getRenderOutput();

    assert.equal(component.props.children, testQuestionee);
  });
});

