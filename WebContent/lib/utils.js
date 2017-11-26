

// ===== HELPER METHODS USED IN DRAW GRAPH ======= //

function addNodeToGraph(node, graphData)
{
	if (!isExist(node)) 
	{
		
	var nodeSize;
		var vertex_metadata = getVertexInVetricesObject(node, graphData.vertices);
		//console.log(vertex_metadata);
	
		if (vertex_metadata!=null)
		{
			if (vertex_metadata.external_flag=="true")
			{
			nodeColor = external_node_color ;	// external node color is a global variable. if internal, we will use the defaultNodeColor
			}
			else
			{
			nodeColor=defaultNodeColor;	
			}
			
			var vertex_pageRank_value = getVertexInPageRankObject(node, graphData.vertices);
				if (vertex_pageRank_value!=null)
				{
				//nodeSize = pageRank_factor * vertex_pageRank_value; // pageRank_factor = by how much to multiply so that the muliplication would look visually understandable
				var calculatedNodeSize = pageRank_factor * vertex_pageRank_value;
				if (calculatedNodeSize < minNodeSize) { calculatedNodeSize =  minNodeSize;}
				if (calculatedNodeSize > maxNodeSize) { calculatedNodeSize =  maxNodeSize;}
				nodeSize = calculatedNodeSize;
				}
				else
				{
				console.log("vertex_pageRank_value is null");	
				nodeSize=defaultNodeSize;
				}
				
				// TO DO - show image based on machine_type
				// var image_url = 'https://secure.gravatar.com/avatar/91bad8ceeec43ae303790f8fe238164b';
				
		}
		else
		{
			console.log("vertex_metadata is null");
			nodeColor = undefinedNodeColor;
			nodeSize=defaultNodeSize;
		}
		
		var image_url = getImageUrlByType(vertex_metadata.machine_type);
	graph.addNode(node, { size: nodeSize, color: nodeColor, black_list: vertex_metadata.black_list, external_flag: vertex_metadata.external_flag, machine_type: vertex_metadata.machine_type, page_rank: vertex_metadata.page_rank, url: image_url}); // replace hard coded with real data when available
	}
}

function addLinkToGraph(source, dest, epoch, edgeId)
{
	if (graph.getLink(source, dest) == null && graph.getLink(dest, source) == null)
	{
		graph.addLink(source, dest, {
			// add more data as required
			action_time: epoch,
			id: edgeId
		});	
	}		
}

/* ================== Node Data and Metadata object access related functions ================== */

// look for a specific vertex in the object ticket_vetrices_metadata and return the object with that vertex id
function getVertexInVetricesObject(vertex_id, vertices) {
    for (var i = 0; i < vertices.length; i++) {
        if (vertices[i]._id == vertex_id) {
            return vertices[i];
        }

        if (i == vertices.length - 1) {
            console.log("function getVertexInVetricesObject: no vertex with id " + vertex_id + " was found in the metadata located in graphData.vertices object");
        }
    }
}

function getVertexInPageRankObject(vertex_id, vertices){

	if (vertices.length > 0) 
	{	
	   for (var i = 0; i < vertices.length; i++) {
			if (vertices[i]._id == vertex_id) {
				return vertices[i].page_rank;
			}

			if (i == vertices.length - 1) {
				console.log("function getVertexInPageRankObject: no vertex with id " + vertex_id + " was found in the graphData.vertices object ")
			}
		}	
	}
	else
	{
	//	console.log("vertices pagerank array is empty");
	}
}    

function isExist(nodeId) {
// we check the node is not already existing before adding (so we won't count it twice in our legend)
    return graph.getNode(nodeId) == null ? false : true;
}

function getImageUrlByType(type)
{
var url = "https://secure.gravatar.com/avatar/91bad8ceeec43ae303790f8fe238164b";
	if (type!==undefined)
	{
		switch(type) 
		{
			case "personal":
				url = personalCompImgUrl; // global param
				break;
			case "server":
				url = serverImgUrl;  // global param
				break;
			default:
				console.log("Function getImageUrlByType: switch statement hit default code block. Using default image url");
		}	
	}
	else
	{
		console.log("Function getImageUrlByType: Type is undefined. Using default image url");
	}
return url;
}



