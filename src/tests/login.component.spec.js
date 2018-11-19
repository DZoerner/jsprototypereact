import jsdom from 'mocha-jsdom';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactTestUtils from 'react-dom/test-utils';
import { Router, Switch, Route} from 'react-router-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock' //Api for restcalls
import expect from 'jest'
import {userConstants} from "../constants";
import { userActions, alertActions} from '../actions';
import  { Login } from '../components/login/';
import  { Home } from '../components/home/';
import Navigation from '../components/navigation';


describe('Login', () => {
    jsdom();
    it('properly renders static markup', () => {
        const result = renderToStaticMarkup(<Login/>);
        expect(result).toBe('div');
    });

    it('properly renders shallow', () => {
        const renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <Login/>
        );
        const tree = renderer.getRenderOutput();
        expect(tree.type).toBe('div');
    });

    it('properly renders', () => {
        const component = ReactTestUtils.renderIntoDocument(
            <Home/>
        );
        expect(ReactTestUtils.isCompositeComponentWithType(component, Home)).toExist('Result should be a LoginComponent');
        const naviComponents = ReactTestUtils.findAllInRenderedTree(component, (component) => ReactTestUtils.isCompositeComponentWithType(component, Navigation));
        expect(naviComponents.length).toEqual(3);
    });
});









const API_URL = 'http://localhost:8081/'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('creates AUTH_USER action when user is logged in', () => {
        nock(API_URL)
            .post("authenticate")
            .reply(200, {data: 'Logged in successfully'})

        const expectedActions = [
            {type: userConstants.LOGIN_SUCCESS}
        ]

        const store = mockStore({})

        store.dispatch(userActions.login('hschwinge', 'ringo'))
        expect(store.getActions()).toEqual(  [{"type": "USERS_LOGIN_REQUEST", "user": {"username": "hschwinge"}}])
    })

    it('creates AUTH_ERROR if user login fails', () => {
        nock(API_URL)
            .post("authenticate")
            .reply(404, {data: {error: 404}})

        const expectedActions = [
            {type: userConstants.LOGIN_FAILURE}
        ]
        const store = mockStore({})

        store.dispatch(userActions.login('misteingabe', 'ringo'))
        expect(store.getActions()).toEqual(expectedActions)

    })
})