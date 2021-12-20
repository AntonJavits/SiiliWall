import React from 'react'

export default function ErrorPage() {

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: '15%',

            }}>

            <div>
                <img src="https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_960_720.png" height="150" width="150" alt="page error" />

                <p>Something went wrong!</p>
                <p>What caused this error:</p>
                <br />
                <p>1. Check your internet connection</p>
                <p>2. There might be an error in the database</p>
                <p>3. Who knows?</p>
                <p>4. Contact the admin about this problem</p>
                <p>5. Go do something else while the problem is solved</p>
                <p>6. Have a nice day!</p>

            </div>

        </div>

    )
}