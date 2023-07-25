package com.PlayerAPI.PlayerAPI.Controller;

import com.PlayerAPI.PlayerAPI.Model.Player;
import com.PlayerAPI.PlayerAPI.Service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/player")
@CrossOrigin("*")
public class PlayerController {
    @Autowired
    PlayerService playerService;

    /*****  Add Player *****/
    @PostMapping
    public void addPlayer(@RequestBody Player player) {
        playerService.addPlayer(player);
    }

    /*****  Get All Players *****/
    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    /*****  Get Player By Id *****/
    @GetMapping("/{id}")
    public Player getPlayerById(@PathVariable Integer id) {
        return playerService.getPlayerById(id);
    }

    /*****  Delete Player By Id *****/
    @DeleteMapping("/{id}")
    public void deletePlayerById(@PathVariable Integer id) {
        playerService.deletePlayerById(id);
    }

    /*****  Update Player By Id *****/
    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Integer id, @RequestBody Player updateData){
        Player player = playerService.updatePlayer(id, updateData);
        if (player != null) {
            return ResponseEntity.ok(player);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
