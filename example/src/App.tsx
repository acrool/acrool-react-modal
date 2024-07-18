import './App.css';

import {GridThemeProvider} from '@acrool/react-grid';
import {ModalPortal} from '@acrool/react-modal';
import {HashRoute,HashRoutes} from '@acrool/react-router-hash';
import {createBrowserHistory} from 'history';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';

import Banner from './components/Banner';
import {PromotionModalA} from './viewModal/PromotionModal';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import EditAccountModal from './views/ViewModal/EditLayout/EditAccountModal';
import EditPasswordModal from './views/ViewModal/EditLayout/EditPasswordModal';


const history = createBrowserHistory({window});


const MainRouter = () => {
    return <Router>

        <Routes>
            <Route path="/" element={<Dashboard/>} />

            {/* NotFound */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>


        {/*<MyTest/>*/}
        <HashRoutes>
            {/*個人各式資訊頁面*/}
            <HashRoute path="control/*">
                <HashRoute path="editAccount/:id" element={<EditAccountModal/>}/>
                <HashRoute path="editPassword/:id" element={<EditPasswordModal/>}/>
            </HashRoute>
        </HashRoutes>

    </Router>;
};


function App() {
    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>

                <MainRouter/>

                <button type="button" onClick={() => PromotionModalA.show()}>Open</button>

                <ModalPortal/>
            </div>
        </GridThemeProvider>
    );
}

export default App;
