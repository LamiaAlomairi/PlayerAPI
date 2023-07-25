package com.PlayerAPI.PlayerAPI.Controller;

import com.PlayerAPI.PlayerAPI.Model.Player;
import com.PlayerAPI.PlayerAPI.Service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
