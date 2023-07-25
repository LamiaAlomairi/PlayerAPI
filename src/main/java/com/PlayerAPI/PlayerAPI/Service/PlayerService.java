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

    /*****  Get Player By Id *****/
    public Player getPlayerById(Integer id) {
        return playerRepository.findById(id).get();
    }

    /*****  Delete Player By Id *****/
    public void deletePlayerById(Integer id) {
        playerRepository.deleteById(id);
    }

    /*****  Update Player By Id *****/
    public Player updatePlayer(Integer id, Player player) {
        Player existingPlayer = playerRepository.findById(id).orElse(null);

        if (existingPlayer != null) {
            existingPlayer.setName(player.getName());
            existingPlayer.setEmail(player.getEmail());
            return playerRepository.save(existingPlayer);
        }
        return null;
    }
}
