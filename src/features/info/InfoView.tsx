import React from "react";
import Form from "../styled-components/form";
import Title from "../styled-components/h1Title";
import Text from "../styled-components/text";

export const InfoView = () => {

    return <div className="container mt-4 mb-5">
        <div className="row justify-content-center">

            <Form className="col-sm-5 p-4 m-2">
                <Title>Catch pokécats!</Title>
                <Text>You can't battle without a cat, so make sure you go to the catch page where you can choose from 3 different cats. You can only catch one cat daily, so make sure to come back every day and try to catch the best cat!</Text>
            </Form>
            <Form className="col-sm-5 p-4 m-2">
                <Title>Battle other pokécats!</Title>
                <Text>In the Battle arena is where it happens! You get to battle against other users' cats in order to climb the leaderboard. The battle is currently completely automated. We are working on better interaction for the battle that will make the user more involved.</Text>
            </Form>
            <Form className="col-sm-5 p-4 m-2">
                <Title>Climb the leaderboard!</Title>
                <Text>In the leaderboard on the homepage is where you want to be. Only the top ten users with the most wins will appear on the leaderboard, so try to become the very best!</Text>
            </Form>
            <Form className="col-sm-5 p-4 m-2">
                <Title>Checkout your profile!</Title>
                <Text>If you want to view your profile you can just navigate there to see all the cats that you have captured. You will also get information about your statistics in regard to how many battles you have participated in and how many battles you have won.</Text>
            </Form>
        </div>
    </div>
}