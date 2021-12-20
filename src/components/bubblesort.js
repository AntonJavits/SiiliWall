export default function bubbleSort(users) {
    const changeArrays = (users, x, y) => {
        let temp = users[x];
        users[x] = users[y];
        users[y] = temp;
    };

    for (let i = 0; i < users.length - 1; i++) {
        for (let x = 0; x < users.length - i - 1; x++) {
            if (users[x].userName.toUpperCase() > users[x + 1].userName.toUpperCase()) {
                changeArrays(users, x, x + 1)
            }
        }
    }
    return users
}