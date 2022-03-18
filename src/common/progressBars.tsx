import _ from "lodash"
import React from "react"
import { ProgressBar } from "react-bootstrap"

type WSPPProps = {
    now: number,
}

interface IProgressProps {
    now?: number,
    variant?: string,
    label?: React.ReactNode,
    max?: number,
}

/**
 * Wraps a component that can take the properties `now`, `label`,
 * `variant` and `max`, by a component that only needs a `now` value
 * and supply the other properties. Properties given to the returned
 * component will overwrite the values supplied by the wrapper.
 * 
 * How `variant` is supplied:
 * If `now` is less or equal to `maxDanger`, `variant` will be set
 * to "danger". If `now` is in the interval (maxDanger, maxWarning]
 * `variant` will be set to "warning". Otherwise, `variant` will be
 * set to "success".
 * 
 * @param ProgressComponent The component that should be rendered
 *        with the supplied `label`, `variant` and `max` properties.
 * @param maxDanger The maximal value of `now` that should result
 *        in `variant` being set to "danger".
 * @param maxWarning The maximal value of `now` that should result
 *        in `variant` being set to "warning".
 * @param nowToLabel A function that describes how the `label` prop
 *        should be supplied to `ProgressComponent` given `now`.
 * @param defaultMax An optional default value for the `max` prop.
 * @returns A component that behaves like `ProgressComponent`, but
 *        that supplies its own values for the `label`, `variant`
 *        and `max` props if not provided.
 */
const withSuppliedProgressProps = <P extends IProgressProps>(
    ProgressComponent: React.ComponentType<P>,
    maxDanger: number,
    maxWarning: number,
    nowToLabel: (now: number) => React.ReactNode,
    defaultMax?: number
): React.FC<P & WSPPProps> => 
        ({ now, ...props}) => {
        const finalProps : P = {
            now,
            label: nowToLabel(now),
            variant: now <= maxDanger ? "danger" : now <= maxWarning ? "warning" : "success",
            max: defaultMax,
            ...props as P
        }
        return <ProgressComponent {...finalProps} />;
}

export const HPBar = withSuppliedProgressProps(ProgressBar, 20, 50, (value) => `${value}%`)
export const CatStatsBar = withSuppliedProgressProps(ProgressBar, 10, 20, _.identity, 30)