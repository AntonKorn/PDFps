function createUpdatePlayerLocationBehaviour() {
    function update(scene, updateDuration) {
        if (scene.map && scene.player) {
            var map = scene.map;
            var player = scene.player;

            if (player.angleDelta != 0) {
                player.angle += player.angleDelta * updateDuration;
            }

            if (player.speed != 0) {
                var nextPlayerX = player.x + Math.sin(player.angle) * player.speed * updateDuration;
                var nextPlayerY = player.y + Math.cos(player.angle) * player.speed * updateDuration;

                if (!map.isCollision(Math.floor(nextPlayerX), Math.floor(nextPlayerY))) {
                    player.x = nextPlayerX;
                    player.y = nextPlayerY;
                }
            }
        }
    }

    return ({
        update: update
    });
}
