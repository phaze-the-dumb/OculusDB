import NavBar from '../NavBar/NavBar'
import Home from '../Home/Home'
import Footer from '../Footer/Footer'
import SupportUs from '../SupportUs/SupportUs'
import FourOhFour from '../FourOhFour/FourOhFour'
import InfoStats from '../InfoStats/InfoStats'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'
import Activity from '../Activity/Activity'
import SearchPage from '../SearchPage/SearchPage'
import APIDocs from '../APIDocs/APIDocs'
import DetailsPage from '../DetailsPage/DetailsPage'
import Login from '../Login/Login'
import SavedApps from '../SavedApps/SavedApps'
import { DowngradingGuide, DowngradingGuidePc, DowngradingGuideQuest, DowngradingGuideQuestQavs, DowngradingGuideQuestSqq, DowngradingGuideRift } from '../DowngradingGuide/DowngradingGuide'

import './App.css'
import { Switch, Match, createSignal, createEffect } from 'solid-js'

let pageTitles: any = {
  '/home': 'Home - OculusDB',
  '/supportus': 'Support Us - OculusDB',
  '/stats': 'Info & Stats - OculusDB',
  '/activity': 'Recent Activity - OculusDB',
  '/privacy': 'Privacy Policy - OculusDB',
  '/saved': 'Saved Apps - OculusDB',
  '/login': 'Login - OculusDB',

  '/api/docs': 'API Documentation - OculusDB',

  '/guide': 'Downgrading Guide - OculusDB',
  '/guide/rift': 'Downgrading Guide (Rift) - OculusDB',
  '/guide/quest': 'Downgrading Guide (Quest) - OculusDB',
  '/guide/quest/pc': 'Downgrading Guide (Quest) - OculusDB',
  '/guide/quest/sqq': 'Downgrading Guide (Quest) - OculusDB',
  '/guide/quest/qavs': 'Downgrading Guide (Quest) - OculusDB',
}

function App() {
  let currentUrl = window.location.pathname;
  let zuck: HTMLElement;
  let zuckShown = false;

  let lastMouseMove = Date.now();

  if(currentUrl.endsWith('/')){
    let splitUrl = currentUrl.split('');
    splitUrl.pop();

    currentUrl = splitUrl.join('');
  }

  let [ currentTab, setCurrentTab ] = createSignal(currentUrl);
  let [ currentSearch, setCurrentSearch ] = createSignal('None');
  let [ currentID, setCurrentID ] = createSignal('None');
  let [ query, setQuery ] = createSignal<any>({}, { equals: false });

  let queryString = window.location.href.split('?')[1];
  if(queryString){
    let querys = queryString.split('&');

    let qObject: any = {};
    querys.forEach(q => {
      let splitQ = q.split('=');
      qObject[splitQ[0]] = splitQ[1];
    })

    setQuery(qObject);
  }

  if(currentTab() === '')setCurrentTab('/home');

  let formatQuery = ( objQuery: any ) => {
    let qText = '';
    let vals = Object.values(objQuery);

    Object.keys(objQuery).forEach((key , i) => {
      qText += '&' + key + '=' + vals[i];
    })

    qText = '?' + qText.substring(1, qText.length);
    return qText;
  }

  if(currentUrl.startsWith('/search/'))
    setCurrentSearch(decodeURIComponent(currentUrl.replace('/search/', '')));

  if(currentUrl.startsWith('/id/'))
    setCurrentID(decodeURIComponent(currentUrl.replace('/id/', '')));

  window.onpopstate = () => {
    let currentUrl = window.location.pathname;

    setCurrentTab(currentUrl);

    if(currentTab() === '')setCurrentTab('/home');

    if(currentUrl.startsWith('/search/'))
      setCurrentSearch(decodeURIComponent(currentUrl.replace('/search/', '')));

    if(currentUrl.startsWith('/id/'))
      setCurrentID(decodeURIComponent(currentUrl.replace('/id/', '')));
  }

  createEffect(() => {
    let tab = currentTab();
    document.querySelector<HTMLInputElement>('#nav-open')!.checked = false;

    if(tab.startsWith('/search/')){
      document.querySelector('title')!.innerText = 'Search - Oculus DB'
      window.history.pushState(null, 'Search - Oculus DB', tab + formatQuery(query()));

      setCurrentSearch(decodeURIComponent(tab.replace('/search/', '')));
    } else if(tab.startsWith('/id/')){
      document.querySelector('title')!.innerText = 'Loading... - Oculus DB'
      window.history.pushState(null, 'Loading... - Oculus DB', tab + formatQuery(query()));

      setCurrentID(decodeURIComponent(tab.replace('/id/', '')));
    } else{
      document.querySelector('title')!.innerText = pageTitles[tab] || '404 Not Found - Oculus DB'
      window.history.pushState(null, pageTitles[tab] || '404 Not Found - Oculus DB', tab + formatQuery(query()));
    }
  })

  window.addEventListener('mousemove', () => {
    lastMouseMove = Date.now();

    if(zuckShown){
      zuck.style.bottom = '-300px';
      zuck.style.rotate = '-45deg';
      zuckShown = false;
    }
  })

  setInterval(() => {
    if(lastMouseMove + 10000 > Date.now() && zuckShown === false && Math.floor(Math.random() * 100) === 1){
      zuck.style.bottom = '0px';
      zuck.style.rotate = '0deg';
      zuckShown = true;
    }
  }, 10000);

  return (
    <>
      <NavBar setCurrentTab={setCurrentTab} />

      <Switch fallback={<FourOhFour />}>
        <Match when={currentTab() === '/home'}>
          <Home setCurrentTab={setCurrentTab} />
        </Match>
        <Match when={currentTab() === '/supportus'}>
          <SupportUs />
        </Match>
        <Match when={currentTab() === '/guide'}>
          <DowngradingGuide setCurrentTab={setCurrentTab} />
        </Match>
        <Match when={currentTab() === '/guide/quest'}>
          <DowngradingGuideQuest setCurrentTab={setCurrentTab} />
        </Match>
        <Match when={currentTab() === '/guide/rift'}>
          <DowngradingGuideRift setCurrentTab={setCurrentTab} />
        </Match>
        <Match when={currentTab() === '/guide/quest/sqq'}>
          <DowngradingGuideQuestSqq setCurrentTab={setCurrentTab} />
        </Match>
        <Match when={currentTab() === '/guide/quest/qavs'}>
          <DowngradingGuideQuestQavs setCurrentTab={setCurrentTab} />
        </Match>
        <Match when={currentTab() === '/guide/quest/pc'}>
          <DowngradingGuidePc setCurrentTab={setCurrentTab} />
        </Match>
        <Match when={currentTab() === '/stats'}>
          <InfoStats />
        </Match>
        <Match when={currentTab() === '/privacy'}>
          <PrivacyPolicy />
        </Match>
        <Match when={currentTab() === '/activity'}>
          <Activity />
        </Match>
        <Match when={currentTab().startsWith('/search/')}>
          <SearchPage currentTab={currentTab} setCurrentTab={setCurrentTab} currentSearch={currentSearch} query={query} setQuery={setQuery} />
        </Match>
        <Match when={currentTab().startsWith('/id/')}>
          <DetailsPage currentID={currentID} />
        </Match>
        <Match when={currentTab() === '/api/docs'}>
          <APIDocs />
        </Match>
        <Match when={currentTab() === '/login'}>
          <Login />
        </Match>
        <Match when={currentTab() === '/saved'}>
          <SavedApps setCurrentTab={setCurrentTab} />
        </Match>
      </Switch>

      <div class="zuck" ref={( el ) => zuck = el}></div>

      <Footer />
    </>
  )
}

export default App
