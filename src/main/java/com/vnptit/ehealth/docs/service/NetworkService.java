package com.vnptit.ehealth.docs.service;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.net.telnet.TelnetClient;
import org.springframework.stereotype.Service;

@Service
public class NetworkService {

    public static long sendPing(String ipAddress, int timeOut)  throws UnknownHostException, IOException {
        try {

            long currentTime = System.currentTimeMillis();
            boolean isPinged = InetAddress.getByName(ipAddress).isReachable(timeOut);
            currentTime = System.currentTimeMillis() - currentTime;
            if (isPinged)
                return currentTime;
            else
                return -1;

        } catch (Exception e) {
            throw e;
        }

    }

    public static long telnet(String host,int port, int timeOut)  throws UnknownHostException, IOException {
        try {
            TelnetClient telnetClient = new TelnetClient("vt200");
            telnetClient.setDefaultTimeout(timeOut);
            long currentTime = System.currentTimeMillis();

            try {
                telnetClient.connect(host,port);
                telnetClient.disconnect();
                currentTime = System.currentTimeMillis() - currentTime;
                return currentTime;
            } catch (IOException e) {
                return -99;
            }

        } catch (Exception e) {
            throw e;
        }

    }

    public static String getRequestIp(HttpServletRequest request)  throws UnknownHostException, IOException {
        try {
            String ip = request.getRemoteAddr();
            ip = ip.equals("0:0:0:0:0:0:0:1")?"127.0.0.1":ip;
            return ip;
        } catch (Exception e) {
            throw e;
        }
    }
}
