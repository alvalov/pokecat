import _ from "lodash"
import { Pokecat } from "../../app/store"

type Player = "user" | "opponent"

/**
 * Type that represents a battle turn.
 *  `attacker`   - indicates which of the players (user or opponent) is the attacker
 *                 of this turn.
 *  `startHP`    - the HP that the user and opponent has at the beginning of this turn.
 *  `opponentHP` - the HP that the user and opponent has at the end of this turn.
 */
export type Turn = {
    attacker: Player,
    startHP: HPState,
    endHP: HPState
}

type HPState = {
    user: number,
    opponent: number
}

/**
 * Calculate how much HP should be reduced by an attack. 
 * @param attacker the cat that should perform the attack
 * @param defender the cat that is the target of the attack
 * @returns the damage caused by the attack.
 */
const calculateAttack = (attacker: Pokecat, defender: Pokecat): number => {
    return _.random(1,10) + _.max([attacker.attack - defender.defense, 0])
}

/**
 * Check if `player` is "user"
 */
export const isUser = (player: Player) => _.eq(player, "user")

/**
 * Get the opposite player. If `player` is "user", this returns "opponent".
 * If `player` is "opponent" this returns "user".
 */
export const inv = (player: Player): Player => _.eq(player, "user") ? "opponent" : "user"

/**
 * Generate a sequence of turns for a battle between two cats.
 * @param userCat The cat of the user
 * @param opponentCat The cat of the opponent
 * @returns a list holding information of all the turns in the
 *          battle. Note that it is assumed that all battles
 *          start with both cats having HP = 100.
 */
export const generateBattle = (userCat: Pokecat, opponentCat: Pokecat) => {
    const playersHP: HPState = {"user": 100, "opponent": 100}
    let currentPlayer: Player = userCat.speed >= opponentCat.speed ? "user" : "opponent"
    const turns: Turn[] = []

    while (_.every(playersHP, hp => hp > 0)) {
        const startHP = _.clone(playersHP)
        const [attackerCat, defenderCat] = isUser(currentPlayer) ? [userCat, opponentCat] : [opponentCat, userCat]
        playersHP[inv(currentPlayer)] -= calculateAttack(attackerCat, defenderCat)
        if (playersHP[inv(currentPlayer)] < 0) playersHP[inv(currentPlayer)] = 0
        turns.push({
            attacker: currentPlayer,
            startHP,
            endHP: _.clone(playersHP)
        })
        currentPlayer = inv(currentPlayer)
    }
    return turns
}