// SPDX-License-Identifier: GPL-3.0
pragma solidity = 0.8.7;


contract cont {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}