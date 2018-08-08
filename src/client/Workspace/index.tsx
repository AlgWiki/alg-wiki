import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { mockSolutions } from '../common/mock-data/challenge';
import Container from './view/Container';
import { Task } from '../common/model';
import { GET_TASK } from './graphql';

export interface Props {
  taskId?: string;
  task?: Task;
}
export default class Workspace extends Component<Props> {
  render() {
    const { task, taskId } = this.props;
    // const { solutions, comments } = challenge || { solutions: [], comments: [] };
    const solution = 'const asdf = n => n+1;';

    if (task) {
      return <Container task={task} solutions={mockSolutions} solution={solution} />;
    }

    if (taskId) {
      return (
        <Query query={GET_TASK} variables={{ id: taskId }}>
          {({ loading, data }) => {
            if (loading) return null;
            if (!data) return <span>Error loading challenge...</span>;

            return <Container task={data.taskById} solutions={mockSolutions} solution={solution} />;
          }}
        </Query>
      );
    }

    return null;
  }
}
