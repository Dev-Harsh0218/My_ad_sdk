import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ApiServices {
  Future<void> updateImpressions(String clickedItem,String serverUrl) async {
    final String url = "http://${serverUrl}/updateImpressions";

    Map<String, dynamic> requestBody = {
      'clickedItem': clickedItem,
    };

    try {
      final http.Response response = await http.post(
        Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(requestBody),
      );

      if (response.statusCode == 200) {
        print('Impressions updated successfully');
        // You can handle response data here if needed
      } else {
        print('Error updating impressions: ${response.statusCode}');
        // You can handle error response here if needed
      }
    } catch (error) {
      print('Error updating impressions: $error');
      // Handle network or other errors here
    }
  }

  Future<void> incrementImpressionCount(String adId,String serverUrl) async {
    final String url = "http://${serverUrl}/api/v1/run-ads/increment-ad-impression";

    Map<String, dynamic> requestBody = {
      'running_ad_id': adId,
    };

    try {
      final http.Response response = await http.put(
        Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(requestBody),
      );

      if (response.statusCode == 200) {
        print("=====================================\n");
        print('Impressions updated successfully');
        print("\n===================================");

        // You can handle response data here if needed
      } else {
        print('Error updating impressions: ${response.statusCode}');
        // You can handle error response here if needed
      }
    } catch (error) {
      print('Error updating impressions: $error');
      // Handle network or other errors here
    }
  }


  Future<Map<String, dynamic>> fetchData(
      String apkUniqueKey, String serverUrl) async {
    // String url = 'http://${serverUrl}/getRandomAdsImage'; // Replace with your server address
      String url = 'http://$serverUrl/api/v1/run-ads/apkUniqueKey-get-random-ad';
      print(url);
    final response = await http.get(
      // Uri.parse(url).replace(queryParameters: {'ApkUniqueKey': apkUniqueKey}),
      Uri.parse(url).replace(queryParameters: {'apk_unique_key': apkUniqueKey}),
      headers: {
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      print(response.body);
      final jsonData = response.body;
      final respData = json.decode(jsonData)['data'];
      print(respData['randomImage']);
      // await updateImpressions(respData['randomImage'],serverUrl);
      await incrementImpressionCount(respData['ad_id'], serverUrl);
      return respData;
    } else {
      print('Error fetching data: ${response.body}');
    }
    return {};
  }

  Future<void> incrementClickCount(String imageId, String serverUrl) async {
    try {
      await http.post(
        Uri.parse('http://${serverUrl}/incrementClickCount'),
        body: jsonEncode({'imageId': imageId}),
        headers: {'Content-Type': 'application/json'},
      );
    } catch (e) {
      print(e.toString());
    }
  }

  Future<void> incrementAdClickCount(String ad_id,String serverUrl) async {
    try{
      await http.put(
        Uri.parse('http://$serverUrl/api/v1/run-ads/increment-ad-click/'),
        body:jsonEncode({
          "running_ad_id": ad_id
        }),
        headers: {'Content-Type': 'application/json'},
      );
    } catch (e){
      print(e.toString());
    }
  }

  Future<void> dailyClickCount(String imageId, String serverUrl) async {
    try {
      await http.post(
        Uri.parse('http://${serverUrl}/incrementDailyClickCount'),
        body: jsonEncode({'imageId': "$imageId.png"}),
        headers: {'Content-Type': 'application/json'},
      );
    } catch (e) {
      print(e.toString());
    }
  }
}

