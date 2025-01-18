import {Flex} from '@acrool/react-grid';
import styled from 'styled-components';

import {useGlobalModal} from '@acrool/react-modal';
import Button from '../../atoms/Button';
import {PrimaryWithHideMask} from './CreateModalPrimary';


const MyPage = () => {

    const {hide} = useGlobalModal();

    return <Flex className="gap-1">
        <Flex column className="gap-1">
            <Button
                color="primary"
                onClick={() => PrimaryWithHideMask.showWithKey('1')}
            >
                Open (queueKey: 1)
            </Button>
            <Button
                color="grayDanger"
                onClick={() => hide('1')}
            >
                Hide (queueKey: 1)
            </Button>

        </Flex>

        <Flex column className="gap-1">
            <Button
                color="primary"
                onClick={() => PrimaryWithHideMask.showWithKey('2')}
            >
                Open (queueKey: 2)
            </Button>

            <Button
                color="grayDanger"
                onClick={() => hide('2')}
            >
                Hide (queueKey: 2)
            </Button>
        </Flex>

    </Flex>;
};

export default MyPage;


