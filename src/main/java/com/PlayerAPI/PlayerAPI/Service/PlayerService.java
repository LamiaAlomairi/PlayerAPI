package com.PlayerAPI.PlayerAPI.Service;

import com.PlayerAPI.PlayerAPI.Model.Player;
import com.PlayerAPI.PlayerAPI.Repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    @Autowired
    PlayerRepository playerRepository;

    /*****  Add Player *****/
    public void addPlayer(Player player){
        playerRepository.save(player);
    }

    /*****  Get All Players *****/
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }
}
