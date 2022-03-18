import React from "react";
import { UserStats } from "../../common/commonTypes";
import Table from 'react-bootstrap/Table';
import _ from "lodash";
import ThTitle from "../styled-components/thTitle";
import Spinner from "../../common/Spinner";

type HomeProps = {
    highScore: UserStats[]
}
export const HomeView = (props: HomeProps) => {
    function highScoreList() {
        return(
            _(props.highScore).orderBy(['wonBattles', (score) => score.wonBattles / score.battles] , ['desc', 'desc'])
            .map((score, idx) =>
                <tr key={idx}>
                    <td>{score.username}</td>
                    <td>{score.battles}</td>
                    <td>{score.wonBattles}</td>
                    <td>{score.battles > 0 ? `${(score.wonBattles / score.battles * 100).toFixed()}%` : "-"}</td>
                </tr>)
            .take(10)
            .value()
        )
    }
    return (
    <div className="container">
        <div className="row justify-content-center mt-5">
            <div className="col-sm-6">
                <h1 className="mb-5 text-center">Welcome to Pokécat!</h1>
                <p className="text-center">Don't forget to catch your daily cat! Win battles to get on the leaderboard :)</p>
            </div>
        </div>
        <div className="row justify-content-center mt-5">
            <h3 className="text-center">Leaderboard</h3>
            {!props.highScore ? <Spinner /> : 
                <Table striped bordered hover variant="light">
                    <thead>
                    <tr>
                        <ThTitle>Username</ThTitle>
                        <ThTitle>Battles</ThTitle>
                        <ThTitle>Wins</ThTitle>
                        <ThTitle>Win rate</ThTitle>
                    </tr>
                    </thead>
                    <tbody>
                    {highScoreList()}
                    </tbody>
                </Table>
            }
        </div>
    </div>
    )
}