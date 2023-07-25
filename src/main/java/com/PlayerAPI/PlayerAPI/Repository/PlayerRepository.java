package com.PlayerAPI.PlayerAPI.Repository;

import com.PlayerAPI.PlayerAPI.Model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
}
