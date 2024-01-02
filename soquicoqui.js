window.addEventListener("load", function(){
    main()
});

let files = [1, 2, 3, 4, 5, 6, 7, 8];
let coordinates = ["00", "01", "02", "10", "11", "12", "20", "21", "22"]; // coords are "id" in the html
let grey_tile_src = "0.png";

function main() {
    
    setup();
    
    // plays
    for (let part of coordinates) {
        // adds an event listener in each tile and has it check the neighbors when clicked
        document.getElementById(part).addEventListener("click", function(){
            // "part" is the tile that was clicked
            // "gray_coords" is the position of the gray one (if it is neighboring)
            let gray_coords = check_neighbors(get_neighbors(part));
            if (gray_coords === undefined){
                return;
            } else {
                switch_pieces(part, gray_coords);
                if (check_solved()) {
                    document.getElementById(part).setAttribute("src", "9.png");
                    document.getElementById("victory").removeAttribute("hidden");
                }
            }
        });
    }

    document.getElementById("button").addEventListener("click", function(){
        // sets new game
        setup();
    })

    // FUNCTIONS
    function setup() {
        // arranges board
        let order = arrange_pieces();
        while (check_solvable(order) !== 0) {
            console.log("i cannot be solved :( so i will be deleted a replaced with a better version of myself :(");
            order = arrange_pieces();
        }
        document.getElementById(coordinates[coordinates.length-1]).setAttribute("src", grey_tile_src)
        document.getElementById("victory").setAttribute("hidden", "hidden");
    }

    function arrange_pieces() {
        let chosen_order =[];
        let files_copy = files.slice();
        // arranges the first 8 images and leaves the ninth one gray
        for (let part of coordinates.slice(0, -1)) {
            let part_element = document.getElementById(part);
            let chosen_index = get_random(files_copy);
            part_element.setAttribute("src", files_copy[chosen_index].toString() +".png");
            chosen_order.push(files_copy[chosen_index]);
            files_copy.splice(chosen_index, 1);
        }
        return chosen_order;
    }

    function get_random(list) {
        let chosen_index = Math.floor(Math.random()*list.length);
        return chosen_index;
    }
 
    function check_solvable(order) {
        // checks if arrangement is solvable
        // if the count is even it is solvable, if it is not, it is not
        count = 0;
        for (let i = 0; i < order.length - 1; i++) {
            for (let j = i+1; j < order.length; j++) {
                if ((order[j] !== 0) && (order[i] !== 0) && (order[i] > order[j])) {
                    count++;
                }
            }
        }
        return count % 2;
    }
    
    function get_neighbors(tile_coord) {
        // makes a little list with the coordinates of the neighboring tiles
        // we will then check if one of them is the gray one
        let x = parseInt(tile_coord[0]);
        let y = parseInt(tile_coord[1]);
        let neighbors = [[x, y-1],[x, y+1],[x-1, y],[x+1, y]];
        // no loops - Loopy McLoopface would be sad :(
        neighbors = neighbors.filter(function (coords) {
            return coords[0] >= 0 && coords[0] <= 2 && coords[1] >= 0 && coords[1] <= 2;
        }).map(function (coords) {
            return coords[0].toString() + coords[1].toString();
        });
        console.log(neighbors);
        return neighbors;
    }

    function check_neighbors(neighbor_list) {
        // looks for the grey one in the neighbor list and, if present, tells which one it is
        for (let neighbor of neighbor_list) {
            if (document.getElementById(neighbor).getAttribute("src") === "0.png") {
                console.log("yes i know the gray one and he lives next to me at: " + neighbor);
                return neighbor;
            }
        }
    }

    function switch_pieces(clicked_tile, target_coords) {
        let clicked_tile_src = document.getElementById(clicked_tile).getAttribute("src");
        document.getElementById(target_coords).setAttribute("src", clicked_tile_src);
        document.getElementById(clicked_tile).setAttribute("src", grey_tile_src);
    }

    function check_solved() {
        // goes through each tile and checks if src attribute is the right number (stops as soon as it finds one that-s wrong)
        let n = 1;
        for (let tile of coordinates.slice(0, -1)) {
            if (document.getElementById(tile).getAttribute("src") !== n.toString() + ".png") {
                return false;
            } else {
                n += 1;
                console.log("")
                continue;
            }
        }
        return true;
    }
}
