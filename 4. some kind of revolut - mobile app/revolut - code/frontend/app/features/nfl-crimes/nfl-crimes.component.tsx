import { List, ListItem, Tab, Tabs } from "native-base";
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './nfl-crimes.component.styles';

enum NflCrimesTabs {
    byTeam = 'byTeam',
    byPosition = 'byPosition',
    byPlayer = 'byPlayer'
}

interface INflCrimesProps {
    navigation: any;
}

interface INflCrimesTab {
    key: keyof typeof NflCrimesTabs;
    list: any[];
    title: string;
}

interface INflCrimesState {
    error?: string,
    tabs: {
        [NflCrimesTabs.byTeam]: INflCrimesTab,
        [NflCrimesTabs.byPosition]: INflCrimesTab,
        [NflCrimesTabs.byPlayer]: INflCrimesTab
    };
}

export default class NflCrimesComponent extends Component<INflCrimesProps, INflCrimesState> {
    constructor(props: any) {
        super(props);

        this.state = {
            tabs: {
                [NflCrimesTabs.byTeam]: {
                    key: NflCrimesTabs.byTeam,
                    title: 'By Team',
                    list: []
                },
                [NflCrimesTabs.byPosition]: {
                    key: NflCrimesTabs.byPosition,
                    title: 'By Position',
                    list: []
                },
                [NflCrimesTabs.byPlayer]: {
                    key: NflCrimesTabs.byPlayer,
                    title: 'By Player',
                    list: []
                }
            }
        };
    }

    public componentWillMount() {
        Promise
            .all([
                this.getCrimesByTeam(),
                this.getCrimesByPosition(),
                this.getCrimesByPlayer()
            ])
            .then(results => {
                const { tabs } = this.state;
                tabs.byTeam.list = results[0];
                tabs.byPosition.list = results[1];
                tabs.byPlayer.list = results[2];
                this.setState({ tabs, error: undefined });
            })
            .catch(() => {
                const error = 'Failed to load one of the resources.';
                this.setState({ error });
            });
    }

    private getCrimesByTeam = () => {
        // TODO: check reference https://facebook.github.io/react-native/docs/network
        return fetch('http://nflarrest.com/api/v1/crime/topTeams/DUI')
            .then(response => response.json());
    };

    private getCrimesByPosition = () => {
        // TODO: check reference https://facebook.github.io/react-native/docs/network
        return fetch('http://nflarrest.com/api/v1/crime/topPositions/DUI')
            .then(response => response.json());
    };

    private getCrimesByPlayer = () => {
        // TODO: check reference https://facebook.github.io/react-native/docs/network
        return fetch('http://nflarrest.com/api/v1/crime/topPlayers/DUI')
            .then(response => response.json());
    };
    //BALANCE  = RESPONSE.JSON

    private renderByTeamTabContent = ({ Team_name: teamName, Team_city: teamCity, arrest_count: arrestCount }: any) => (
        <ListItem style={styles.listItem}>
            <Text style={styles.listItemLabel}>{teamCity} {teamName} ({arrestCount})</Text>
        </ListItem>
    );

    private renderByPositionTabContent = ({ Position: position, arrest_count: arrestCount }: any) => (
        <ListItem>
            <Text>{position} ({arrestCount})</Text>
        </ListItem>
    );
    private renderByPlayerTabContent = ({ Name: name, arrest_count: arrestCount }: any) => (
        <ListItem>
            <Text>{name} ({arrestCount})</Text>
        </ListItem>
    );

    private renderTab = (tab: INflCrimesTab) => {
        let content;
        let listRenderer;

        switch (tab.key) {
            case NflCrimesTabs.byTeam:
                listRenderer = this.renderByTeamTabContent;
                break;
            case NflCrimesTabs.byPosition:
                listRenderer = this.renderByPositionTabContent;
                break;
            case NflCrimesTabs.byPlayer:
                listRenderer = this.renderByPlayerTabContent;
                break;
        }
        content = (
            <List
                dataArray={tab.list}
                renderRow={listRenderer}
            />
        );

        return (
            <Tab key={tab.key} heading={tab.title}>
                {content}
            </Tab>
        );
    };

    public renderError = (error: string) => (
        <Text style={styles.error}>{error}</Text>
    );

    public renderTabs = (tabs: any) => (
        <Tabs>
            {Object.keys(tabs).map((key: string) =>
                this.renderTab(tabs[key as keyof typeof NflCrimesTabs]))}
        </Tabs>
    );


    public renderContent = () => {
        const { error, tabs } = this.state;
        if (error) {
            return this.renderError(error);
        }
        return this.renderTabs(tabs);
    };

    public render() {
        return (
            <View style={styles.wrapper}>
                {this.renderContent()}
            </View>
        );
    }
}