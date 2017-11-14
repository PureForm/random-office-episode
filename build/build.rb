# This file transforms the raw Netflix http responses I collected
# into the json the app consumes.

require 'json'

json_lines = File.readlines('theoffice.jsonl')
episodes   = []

i = 0
while i < json_lines.count do
  season = JSON.parse(json_lines[i])

  season['value']['videos'].each_value do |video_data|
    if video_data.is_a?(Integer)
      next
    end

    if video_data['summary']['type'] != 'episode'
      next
    end

    episodes.push({
      id:       video_data['summary']['id'],
      title:    video_data['title'],
      season:   video_data['summary']['season'],
      episode:  video_data['summary']['episode'],
      runtime:  video_data['runtime'],
      synopsis: video_data['synopsis']
    })
  end

  i += 1
end

File.write('episodes.js', 'episodes = ' + JSON.generate(episodes), 0, {mode: 'w+'})
