/* eslint-disable */
import { useOktaAuth } from '@okta/okta-react';
import awsconfig from '../aws-exports';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DataCard from './DataCard';
import gql from 'graphql-tag'
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'
const query = gql`
query ListWidgets(
    $filter: TableWidgetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWidgets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        owner
        client_id
        base_url
        js_config
        css_config
        issuer
        img
        name
        description
        link
      }
      nextToken
    }
  }
`
const Dashboard = () => {
    const history = useHistory();
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
    console.log("YAKA")
    const [cards, setCards] = useState([])
    var token = JSON.parse(localStorage.getItem("okta-token-storage"))
    console.log(token.accessToken.value)
    var graphqlClient = new AWSAppSyncClient({
        url: awsconfig.aws_appsync_graphqlEndpoint,
        region: awsconfig.aws_appsync_region,
        disableOffline: true,
        auth: {
            type: AUTH_TYPE.OPENID_CONNECT,
            jwtToken: token.accessToken.value,
        },
    });
    //const cards = []
    useEffect(async () => {
        if (!authState.isAuthenticated) {
            // When user isn't authenticated, forget any user info
            setUserInfo(null);
        } else {
            oktaAuth.getUser().then((info) => {
                setUserInfo(info);
                console.log(userInfo);
                console.log(history);
            });
            if(cards.length == 0) {
                await loadCards()
            }
        }
    }, [authState, oktaAuth]); // Update if authState changes
    var loadCards = async function() {
        var response = await graphqlClient
        .query({
            query: query,
        })
        console.log(response.data)
        // Current placeholder to fill out UI
        const data = {
            img: 'https://i.pinimg.com/originals/32/e2/41/32e2413585f1d2e0333c7dee3c4808bf.jpg',
            name: 'My Sign-in Design',
            meta: 'Created by Mark Vong',
            description: 'This design was inspired by all things fluffy and cute.',
            link: '#',
        };
        var localCards = []
        for (let i = 0; i < response.data.listWidgets.items.length; i += 1) {
            var card = response.data.listWidgets.items[i]
            localCards.push(<DataCard data={card} />);
        }
        console.log(localCards)
        setCards(localCards)
    }
    // Inline styling
    const style = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '15%',
        padding: '0',
    };
    // If user is being authenticated...
    if (authState.isPending) return <div>Loading...</div>;
    // TODO: Add auth and make /dashboard a secureroute
    return (
        <div style={style} className="dashboard">
            {cards}
        </div>
    );
};
export default Dashboard;