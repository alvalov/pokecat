import React, {useEffect, useLayoutEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import { Pokecat } from "../../app/store";
import CatImage from '../styled-components/catImage';
import Divider from "../styled-components/divider";
import CatImageDiv from "../styled-components/catImageDiv";
import CatDiv from "../styled-components/catDiv";
import Button from "../styled-components/button";
import Spinner from "../../common/Spinner";
import { inv, isUser, Turn } from "./battleUtils";
import { Animate, AnimateKeyframes } from 'react-simple-animate';
import { HPBar } from "../../common/progressBars";
import _ from "lodash";

// The possible states of a turn, used for the animation
type TurnState = "start" | "attack" | "attackEnd" | "damage" | "end"

type BattleProps = {
    /**
     * The cat that the user should play with
     */
    userCat: Pokecat,
    /**
     * The username of the current user
     */
    user: string,
    /**
     * The cat that should battle against the user
     */
    opponentCat: Pokecat,
    /**
     * The username of the opponent (the owner of the opponent cat)
     */
    opponentUser: string,
    /**
     * Indicating if needed data is loading or not
     */
    loading: boolean,
    /**
     * If a battle is started, this prop should hold the data related to the
     * current turn.
     */
    currentTurn: Turn,
    /**
     * Function that starts a new battle.
     */
    startBattle: () => void,
    /**
     * Callback that will be called when a battle turn is over.
     */
    onTurnEnd: () => void,
    /**
     * Callback that will be called when a battle is finished.
     * @param userWon is true if the user won and false if the user lost the battle.
     */
    onBattleEnd: (userWon: boolean) => void,
    /**
     * A boolean indicating if a battle has been started or not.
     */
    battleStarted: boolean,
    /**
     * A boolean indicating if the final turn of the battle has ended or not.
     */
    battleEnded: boolean
}

export const BattleView = (props: BattleProps) => {
    const [turnState, setTurnState] = useState<TurnState>("start")
    const [statusText, setStatusText] = useState(`Battle starts!`)

    const currentOpponentHP = turnState == "end" ? props.currentTurn?.endHP.opponent : props.currentTurn?.startHP.opponent
    const currentUserHP = turnState == "end" ? props.currentTurn?.endHP.user : props.currentTurn?.startHP.user

    useLayoutEffect(() => {
        if (!_.isNil(props.currentTurn) && !props.battleEnded) {
            setTurnState("start")
        }
    }, [props.currentTurn])

    useEffect(() => {
        let animationTimer: NodeJS.Timeout;
        let turnTimer: NodeJS.Timeout;
        if (!_.isNil(props.currentTurn) && !props.battleEnded) {
            const [attacker, defender] = [props.currentTurn.attacker, inv(props.currentTurn.attacker)]
            const [attackerCat, defenderCat] = isUser(props.currentTurn.attacker) ?
                [props.userCat.name, props.opponentCat.name] :
                [props.opponentCat.name, props.userCat.name]
            
            setStatusText(`${attackerCat} attacks!`)
            animationTimer = setTimeout(() => {
                setTurnState("attack")
                animationTimer = setTimeout(() => {
                    setTurnState("attackEnd")
                    animationTimer = setTimeout(() => {
                        const damage = props.currentTurn.startHP[defender] - props.currentTurn.endHP[defender];
                        if (damage > 0) {
                            setStatusText(`${defenderCat} takes ${damage} damage!`)
                            setTurnState("damage")
                            animationTimer = setTimeout(() => {
                                setTurnState("end")
                            }, 300)
                        } else {
                            setTurnState("end")
                            setStatusText(`The attack does no damage!`)
                        }
                    }, 300)
                }, 100)
            }, 500)
            turnTimer = setTimeout(() => {
                props.onTurnEnd()
            }, 2500)
        }
        return () => {
            clearTimeout(animationTimer)
            clearTimeout(turnTimer)
        }
    }, [props.currentTurn])

    const startBattle = () => {
        setStatusText("Battle starts!")
        setTurnState("start")
        props.startBattle();
    }

    const handleClose = () => {
        props.onBattleEnd(props.currentTurn.endHP.user > 0)
    }

    return (<div className="container mt-5">
        { props.loading ?
            <div className="row justify-content-center"><Spinner /></div> :
            <>
            {!props.battleStarted &&
                <div className="row justify-content-center">
                    {!props.userCat && <div className="text-center">You need to catch a cat before you battle!</div>}
                    {!props.opponentCat && <div className="text-center">No opponent found! Try again later.</div>}
                    {props.opponentCat && props.userCat && <div className="col-sm-4">
                        <Button onClick={startBattle}><h1>Start Battle!</h1></Button>
                    </div>}
                </div>
            }
            <Modal show={props.battleEnded} onHide={handleClose}>
                <Modal.Body>
                    { props.currentTurn?.endHP.user > 0 ? "You won!" : "You lost!" }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {props.battleStarted && <div className="container">
                <div className="text-center">{statusText}</div>
                <div className="row justify-content-end m-4">
                    <div className="row col-sm-6 align-items-center">
                        <AnimateKeyframes
                            play={turnState == "damage" && isUser(props.currentTurn.attacker)}
                            duration={0.1}
                            iterationCount={2}
                            keyframes={[
                                'transform: translateX(0)',
                                'transform: translateX(10px)',
                                'transform: translateX(-10px)',]} 
                        >
                            <Animate
                                play={turnState == "attack" && !isUser(props.currentTurn.attacker)} 
                                duration={0.1} 
                                start={{ transform: 'translate(0, 0)' }}
                                end={{ transform: 'translate(-50px, 50px)' }} 
                            >
                                <CatDiv className="row col-sm-12 d-flex align-items-center">
                                    <div className="col-sm-6">
                                        <div>
                                            {props.opponentUser}
                                            <h3>{props.opponentCat.name}</h3>
                                            <HPBar now={currentOpponentHP} />
                                        </div>
                                        <div className="row justify-content-between mt-2 mb-2">
                                            <div className="col text-center"><b>ATK</b><br/> {props.opponentCat.attack}</div>
                                            <div className="col text-center"><b>DEF</b><br/> {props.opponentCat.defense}</div>
                                            <div className="col text-center"><b>SPD</b><br/> {props.opponentCat.speed}</div>
                                        </div>
                                    </div>
                                    <CatImageDiv className="col-sm-5">
                                        <CatImage height={150} src={props.opponentCat.url}/>
                                    </CatImageDiv>
                                </CatDiv>
                            </Animate>
                        </AnimateKeyframes>
                    </div>
                </div>
                <div className="row">
                    <Divider></Divider>
                </div>
                <div className="row justify-content-start m-4">
                    <div className="row col-sm-6">
                        <AnimateKeyframes
                            play={turnState == "damage" && !isUser(props.currentTurn.attacker)}
                            duration={0.1}
                            iterationCount={2}
                            keyframes={[
                                'transform: translateX(0)',
                                'transform: translateX(10px)',
                                'transform: translateX(-10px)',]}     
                        >
                            <Animate
                                play={turnState == "attack" && isUser(props.currentTurn.attacker)} 
                                duration={0.1} 
                                start={{ transform: 'translate(0, 0)' }}
                                end={{ transform: 'translate(50px, -50px)' }} 
                            >
                                <CatDiv className="row col-sm-12 d-flex align-items-center">
                                    <div className="col-sm-6">
                                        <div>
                                            {props.user}
                                            <h3>{props.userCat.name}</h3>
                                            <HPBar now={currentUserHP} />
                                        </div>
                                        <div className="row justify-content-between mt-2">
                                            <div className="col text-center"><b>ATK</b><br/> {props.userCat.attack}</div>
                                            <div className="col text-center"><b>DEF</b><br/> {props.userCat.defense}</div>
                                            <div className="col text-center"><b>SPD</b><br/> {props.userCat.speed}</div>
                                        </div>
                                    </div>
                                    <CatImageDiv className="col-sm-5">
                                        <CatImage height={150} src={props.userCat.url}/>
                                    </CatImageDiv>
                                </CatDiv>
                            </Animate>
                        </AnimateKeyframes>
                    </div>
                </div>
            </div>}
            </>
        }
    </div>)
}