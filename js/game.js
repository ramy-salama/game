document.querySelector(".control-buttons span").onclick = function() {

    let yourName = prompt("Whats Your Name");


    if (yourName == "" || yourName == null) {

        document.querySelector(".name span").innerHTML = "Unknown";

    } else {

        document.querySelector(".name span").innerHTML = yourName;

    }

    document.querySelector(".control-buttons").remove();

    document.getElementById('start').play();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function() {

        flipBlock(block);

    });

});

function flipBlock(selectedBolck) {

    selectedBolck.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {

        stopClicking();

        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }

}

function stopClicking() {

    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        blocksContainer.classList.remove('no-clicking');

    }, duration);

}

function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.letters === secondBlock.dataset.letters) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fall').play();
    }

}

function shuffle(array) {

    let current = array.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp

    }

    return array;

}



// Dark Mode

let light = document.querySelector('#light'),
    dark = document.querySelector('#dark');

function darkMode() {
    document.documentElement.style.setProperty('--border', '#252b43');
    document.documentElement.style.setProperty('--text', '#fff');
    document.documentElement.style.setProperty('--background', '#252b43');
    document.documentElement.style.setProperty('--box-shadow', '0 .2rem .2rem rgba(225, 225, 225, .3)');
}

function lightMode() {
    document.documentElement.style.setProperty('--border', '#fff');
    document.documentElement.style.setProperty('--text', '#252b43');
    document.documentElement.style.setProperty('--background', '#fff');
    document.documentElement.style.setProperty('--box-shadow', '0 .2rem .2rem rgba(0, 0, 0, .3)');
}

light.onclick = () => {
    light.classList.remove('show'),
        light.classList.add('haid'),
        dark.classList.add("show")
    lightMode()
}

dark.onclick = () => {
    dark.classList.remove('show'),
        dark.classList.add('haid'),
        light.classList.add("show")
    darkMode()
}