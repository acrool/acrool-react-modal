import {delay} from '@acrool/js-utils/promise';
import {Flex} from '@acrool/react-grid';
import {animation, createModal, useModal} from '@acrool/react-modal';
import {motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import Loader from '../../../assets/loader.svg?react';
import Button from '../../atoms/Button';
import Card from '../../atoms/Card';



/**
 *
 *
 * PS: 示範用客製化光箱
 */
const CreateModalWithFetchWait = () => {
    const {hide} = useModal();
    
    const [isPending, setPending] = useState(true);
    
    
    useEffect(() => {
        delay(1500).then(() => {
            setPending(false); 
        });
        
        
    }, []);
    
    
    if(isPending){
        return <Flex className="align-items-center justify-content-center w-100 h-100 position-relative">
            <Loader/>
        </Flex>;
    }

    return <CreateTaskModalRoot
        {...animation.generateFadeInFromTop()}
    >
        <Card title="With Fetch Wait" direction="column">
            <p>
                    Acrool is an developer driven platform to visually design and manage project infrastructure, collaboratively.
                    It's the solution for any provider
                <a href="https://acrool.com" target="_blank" rel="noreferrer">Link</a>
            </p>

            <Button color="grayDanger" onClick={hide}>Close</Button>
        </Card>

    </CreateTaskModalRoot>;
};

export default createModal(
    CreateModalWithFetchWait,
);





const CreateTaskModalRoot = styled(motion.div)`
  width: 400px;
`;
