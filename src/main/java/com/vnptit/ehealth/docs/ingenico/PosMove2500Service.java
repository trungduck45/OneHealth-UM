package com.vnptit.ehealth.docs.ingenico;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIUtils;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
public class PosMove2500Service {
    private static final Logger logger = LoggerFactory.getLogger(PosMove2500Service.class);
    private String posEnpoint;
    private static Gson gson = new Gson();
    private final static CloseableHttpClient httpClient = HttpClients.createDefault();

    public PosMove2500Service() {}

    public static PosMove2500SaleResponse sale(String endpointUrl, int port, PosMove2500SaleRequest request) throws Exception {
        PosMove2500SaleResponse oPosMove2500Response = new PosMove2500SaleResponse();
        String rs = "";
        try {
            List<NameValuePair> params = new ArrayList<NameValuePair>();
            params.add(new BasicNameValuePair("rqt",request.requestId + "|" + request.clientId));
            params.add(new BasicNameValuePair("cmd","sale|" + String.format("%.0f", request.amount) +"|"+ request.f1 +"|"+ request.f2 +"|"+request.f3+"|"+ request.f4 +"|"+ request.f5));
            //params.add(new BasicNameValuePair("callback","POS_CB"));
            @SuppressWarnings("deprecation")
            URI uri = URIUtils.createURI("http",endpointUrl, port, "ecr",URLEncodedUtils.format(params, "UTF-8"), null);
            //String url = uri.toString().replace("%7C", "|");
            HttpGet oHttpGet = new HttpGet(uri);
            oHttpGet.addHeader("Content-Type","application/x-www-form-urlencoded");

            try (CloseableHttpResponse response = httpClient.execute(oHttpGet)) {

                // Get HttpResponse Status
                //System.out.println(response.getStatusLine().toString());

                HttpEntity entity = response.getEntity();
                Header headers = entity.getContentType();

                if (entity != null) {
                    // return it as a String
                    rs = EntityUtils.toString(entity);

                    if (rs.isEmpty()) {
                        throw new Exception("PosMove2500Service|sale: Return NULL");
                    } else {
                        GsonBuilder oGsonBuilder = new GsonBuilder();
                        gson = oGsonBuilder.serializeNulls().create();
                        oPosMove2500Response = gson.fromJson(rs, PosMove2500SaleResponse.class);
                    }
                }

            }catch (Exception e) {
                logger.error("PosMove2500Service|sale|httpexcute: " + e.getMessage());
                throw e;
            }

        } catch (Exception e) {
            logger.error("PosMove2500Service|sale: " + e.getMessage());
            throw e;

        }
        return oPosMove2500Response;

    }


    public String getPosEnpoint() {
        return posEnpoint;
    }

    public void setPosEnpoint(String posEnpoint) {
        this.posEnpoint = posEnpoint;
    }
}
