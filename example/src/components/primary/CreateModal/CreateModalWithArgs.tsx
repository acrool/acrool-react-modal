import {animation, createModal, useModal} from '@acrool/react-modal';
import React from 'react';
import styled from 'styled-components';

import Button from '../../atoms/Button';
import Card from '../../atoms/Card';


interface IProps {
    promotionId: string
}



const data: Record<string, string> = {
    '1b9d6bcd': `A Gantt chart is a bar chart used to display the internal relationships of projects, schedules, and other time-related system progress over time. It was developed by Henry Gantt in 1910. In project management, the Gantt chart displays the start and end of the terminal elements of the project, as well as the dependencies of summary elements or terminal elements. Managers can monitor the progress of each current task of the project through the Gantt chart.
    <img src="https://acrool.com/images/home/brain_board/visual/workflow.webp" alt="gantt" class="w-100">
    <a href="https://acrool.com" target="_blank">Link</a>
`,
    '2c0e7cde': `What is a Kanban board? It is an agile project management tool that helps visualize work content, track ongoing tasks, improve work transparency, and maximize efficiency. Tools are used to assist teams in establishing and centrally managing tasks in daily work and optimizing processes. Tools are for better delivery and management, and any tool suitable for the team is a good tool
    <img src="https://acrool.com/images/home/brain_board/rbac/image.webp" alt="gantt" class="w-100">
    <a href="https://acrool.com" target="_blank">Link</a>
`,
};


/**
 * 待參數光箱
 */
const CreateModalWithArgs = (args: IProps) => {
    const {hide} = useModal();

    const getData = () => {
        return data[args?.promotionId];
    };

    return <CreateTaskModalRoot>
        <Card title="With Args" direction="column">
            <h2>Promotion Id: {args?.promotionId}</h2>

            <p dangerouslySetInnerHTML={{__html: getData()}}/>

            <Button color="grayDanger" onClick={hide}>Close</Button>
        </Card>


    </CreateTaskModalRoot>;
};



export default createModal(
    CreateModalWithArgs,
    {
        animation: animation.generateFadeInFromTop(20),
        className: 'p-3',
        isBodyScrollEnable: true,
        isHideWithMaskClick: true,
        isMaskHidden: true,
    },
);





const CreateTaskModalRoot = styled.div`
  width: 600px;
`;
