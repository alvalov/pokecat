import React from "react";
import { Pokecat } from '../../app/store';
import TitleDiv from "../styled-components/titleDiv";
import StatsDiv from "../styled-components/statsDiv";
import Card from "../styled-components/card";
import CatImage from "../styled-components/catImage";
import CardTitle from "../styled-components/cardTitle";
import { CatStatsBar } from "../../common/progressBars";
import _ from "lodash";
import Spinner from "../../common/Spinner";

type ProfileProps = {
    username: string,
    pokecats: Pokecat[],
    battles: number,
    wonBattles: number,
    loading: boolean
}

type StatsDisplayProps = {
    value: string | number,
    name: string
}

const StatsDisplay = (props: StatsDisplayProps) => {
    return (
        <StatsDiv className="col-sm-3 justify-content-center">
            <h1>{props.value}</h1>
            <div>
                <h4>{props.name}</h4>
            </div>
        </StatsDiv>
    )
}


// auto fill the cats with a function later! this is just for preview
export const ProfileView = (props: ProfileProps) => {

    let pokeCard = _.map(props.pokecats, (pokecat, idx) =>
        <Card className="col-sm-3" key={idx}>
            <div className="card">
                <div>
                    <CardTitle>
                        <h5 className="card-title text-center">{pokecat.name}</h5>
                    </CardTitle>
                    <CatImage height={200} src={pokecat.url} className="card-image img-fluid rounded p-2"/>
                    <div className="p-2">
                        <span>Attack</span>
                        <CatStatsBar now={pokecat.attack} />
                    </div>
                    <div className="p-2">
                        <span>Defense</span>
                        <CatStatsBar now={pokecat.defense} />
                    </div>
                    <div className="p-2">
                        <span>Speed</span>
                        <CatStatsBar now={pokecat.speed}/>
                    </div>
                </div>
            </div>
        </Card>
    )
    let statsPercentage = props.battles && props.battles > 0 ? `${(props.wonBattles / props.battles * 100).toFixed()}%` : "-";

    return (
        <div className="container align-items-center">
            {props.loading ?  <div className="row justify-content-center"><Spinner /></div> :
            <>
            <h1 className="col-sm-12 mt-3">{`Profile of ${props.username}`}</h1>
            <div className="container col-sm-8">
                <div className="row justify-content-between">
                    <StatsDisplay value={props.battles} name="Battles" />
                    <StatsDisplay value={props.wonBattles} name="Wins" />
                    <StatsDisplay value={statsPercentage} name="Win rate" />
                </div>
            </div>
            <TitleDiv className="container col-sm-12">
                <div className="col-sm-4">
                    <h3>Your Pokécats<span className="badge bg-dark text-light mx-2">{props.pokecats.length}</span></h3>
                </div>
            </TitleDiv>
            <div className="container col-sm-12">
                <div className="row justify-content-between">
                    {pokeCard}
                </div>
            </div>
            </>}
        </div>
    )
}