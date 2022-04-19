# front end rendering

    - [x] have a chess board rendered on the page
    have a 5 boxes for checkmarks
    - [x] score board
    low prio => pop up on user's first visit to explain the game 

## navbar 

    - [x] score child needs to get parent state (isScoreOpen)
    - [x] and modify it on user click outside the score component (from true to false), to close it

# localstorage

    gamestate = {
        board state ( probably just a list of piece coords idk look up how the board works ),
        game state ( how many failed attempts that day, needs to reset every day ),
        score ( how many in a row, how many at 0/1/2/3 mistakes )
    }

# chess board needs to load every day with a new opening

    hard code openings?
    looking into libraries
    [x] figure out how to tell the chess board how to set pieces
    [x] start with one then expand 

# user can move a piece

    [x] if the move is correct => checkmark validation + maybe noise (?)
    [x] how to know if the move is correct? still hardcoding a list of move? or maybe library - look it up
    if the move is incorrect => red cross, 3 fails and you're out + link to relevant opening sequence
        later on, try to make it show up directly on the website, animate the opening + link
    
# game over screen

    card pop up with recap
        statistics:
        "guess" distribution
        next chessle | share

# odds and ends

    add game distribution to the score card
    