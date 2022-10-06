import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearAll, clearDialogue } from '../../shared/redux/modules/modalSlice';
import Loading from '../univ/Loading';
import Deco from '../univ/Deco';


const DialConfAlone = lazy(() => import('./DialConfAlone'));
const DialConfApply = lazy(() => import('./DialConfApply'));
const DialConfWrite = lazy(() => import('./DialConfWrite'));
const DialConfLogin = lazy(() => import('./DialConfLogin'));
const DialConfLeave = lazy(() => import('./DialConfLeave'));
const DialConfRemove = lazy(() => import('./DialConfRemove'));
const DialConfSignup = lazy(() => import('./DialConfSignup'));
const DialConfResult = lazy(() => import('./DialConfResult'));
const DialConfComment = lazy(() => import('./DialConfComment'));
const DialConfReserve = lazy(() => import('./DialConfReserve'));
const DialConfReserved = lazy(() => import('./DialConfReserved'));
const DialDenyExist = lazy(() => import('./DialDenyExist'));
const DialDenyLeave = lazy(() => import('./DialDenyLeave'));
const DialDenyResult = lazy(() => import('./DialDenyResult'));
const DialDenyContact = lazy(() => import('./DialDenyContact'));
const DialDenyFileType = lazy(() => import('./DialDenyFileType'));
const DialDenyReserved = lazy(() => import('./DialDenyReserved'));
const DialDenyChatExist = lazy(() => import('./DialDenyChatExist'));
const DialDenyFileUpload = lazy(() => import('./DialDenyFileUpload'));
const DialDenyResultAgain = lazy(() => import('./DialDenyResultAgain'));
const DialDenyContactAgain = lazy(() => import('./DialDenyContactAgain'));
const DialDenyCommentAgain = lazy(() => import('./DialDenyCommentAgain'));
const DialDenyEnterChatroom = lazy(() => import('./DialDenyEnterChatroom'));
const DialAlreadyDone = lazy(() => import('./DialAlreadyDone'));
const DialApplyCanceled = lazy(() => import('./DialApplyCanceled'));
const DialExpireLogin = lazy(() => import('./DialExpireLogin'));
const DialRemoveMatch = lazy(() => import('./DialRemoveMatch'));
const DialFailLogin = lazy(() => import('./DialFailLogin'));
const DialNoService = lazy(() => import('./DialNoService'));
const DialPermit = lazy(() => import('./DialPermit'));


const DialTemplate = () => {
  const dialData = useSelector((state) => state.modal.dialogueData);
  const dispatch = useDispatch();
  const removeDial = (e) => {
    if(e.target.ariaLabel === 'dialToggle'){
      if(dialData.dialType !== 'confirmRemove'){
        if(dialData.dialType === 'confirmWrite' || dialData.dialType === 'confirmResult'){
          dispatch(clearAll());
        } else{
          dispatch(clearDialogue());
        }
      }
    }
  }

  const dialRouter = () => {
    if(dialData.dialType === 'noService'){
      return <DialNoService />
    } else if(dialData.dialType === 'confirmRemove'){
      return <DialConfRemove />
    } else if(dialData.dialType === 'confirmSignup'){
      return <DialConfSignup />
    } else if(dialData.dialType === 'confirmLogin'){
      return <DialConfLogin />
    } else if(dialData.dialType === 'failLogin'){
      return <DialFailLogin />
    } else if(dialData.dialType === 'expireLogin'){
      return <DialExpireLogin />
    } else if(dialData.dialType === 'confirmWrite'){
      return <DialConfWrite />
    } else if(dialData.dialType === 'confirmApply'){
      return <DialConfApply />
    } else if(dialData.dialType === 'confirmResult'){
      return <DialConfResult />
    } else if(dialData.dialType === 'confirmComment'){
      return <DialConfComment />
    } else if(dialData.dialType === 'confirmReserved'){
      return <DialConfReserved />
    } else if(dialData.dialType === 'confirmReserve'){
      return <DialConfReserve />
    } else if(dialData.dialType === 'confirmAlone'){
      return <DialConfAlone />
    } else if(dialData.dialType === 'alreadyDone'){
      return <DialAlreadyDone />
    } else if(dialData.dialType === 'denyLeave'){
      return <DialDenyLeave />
    } else if(dialData.dialType === 'denyContact'){
      return <DialDenyContact />
    } else if(dialData.dialType === 'denyContactAgain'){
      return <DialDenyContactAgain />
    } else if(dialData.dialType === 'denyExist'){
      return <DialDenyExist />
    } else if(dialData.dialType === 'denyChatExist'){
      return <DialDenyChatExist />
    } else if(dialData.dialType === 'denyEnterChatroom'){
      return <DialDenyEnterChatroom />
    } else if(dialData.dialType === 'denyResult'){
      return <DialDenyResult />
    } else if(dialData.dialType === 'denyResultAgain'){
      return <DialDenyResultAgain />
    } else if(dialData.dialType === 'denyCommentAgain'){
      return <DialDenyCommentAgain />
    } else if(dialData.dialType === 'denyReserved'){
      return <DialDenyReserved />
    } else if(dialData.dialType === 'denyFileType'){
      return <DialDenyFileType />
    } else if(dialData.dialType === 'denyFileUpload'){
      return <DialDenyFileUpload />
    } else if(dialData.dialType === 'applyCanceled'){
      return <DialApplyCanceled />
    } else if(dialData.dialType === 'removeMatch'){
      return <DialRemoveMatch />
    } else if(dialData.dialType === 'permit'){
      return <DialPermit />
    } else if(dialData.dialType === 'confirmLeave'){
      return <DialConfLeave />
    }
  }

  return(
    <DialComp aria-label='dialToggle' onClick={removeDial}>
      <DialSection aria-label='dialTemplate'>
        <Deco />
          <Suspense fallback={<Loading size={20} />}>
            {dialRouter()}
          </Suspense>
      </DialSection>
    </DialComp>
  )
};

export default DialTemplate;


const DialComp = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.dark};
  z-index:3;
`

const DialSection = styled.div`
  position: relative;
  width: 350px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.colors.background};
`