import Page from 'components/Page';
import React from 'react';
import TestsContainer from 'custom/Tests/TestsContainer';

import { mockStudentTest1, mockStudentTest2, mockStudentTest3 } from 'demos/devMock/mockTestResults';

const  tests = [mockStudentTest1,mockStudentTest2,mockStudentTest3];

const TestsPage = () => {
  return (
    <Page
      title="Test Results"
      breadcrumbs={[{ name: 'tests', active: true }]}
      className="TablePage">
      <TestsContainer
        tests={tests}
        username={"Student"}
      />
    </Page>
  );
};

export default TestsPage;
